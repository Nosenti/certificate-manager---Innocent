using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Backend.Middlewares
{

    public class AppExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<AppExceptionHandler> _logger;

        public AppExceptionHandler(ILogger<AppExceptionHandler> logger)
        {
            _logger = logger;
        }
        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            // Log the exception
            _logger.LogError(exception, "Exception ocurred: {Message}", exception.Message);

            var problemDetails = new ProblemDetails();
            httpContext.Response.ContentType = "application/json";

            // Handle specific exception types
            switch (exception)
            {
                case KeyNotFoundException:
                    problemDetails.Status = StatusCodes.Status404NotFound;
                    problemDetails.Title = "Resource Not Found";
                    problemDetails.Detail = exception.Message;
                    break;

                case UnauthorizedAccessException:
                    problemDetails.Status = StatusCodes.Status401Unauthorized;
                    problemDetails.Title = "Unauthorized Access";
                    problemDetails.Detail = "You do not have the necessary permissions to access this resource.";
                    break;

                case ValidationException validationException:
                    problemDetails.Status = StatusCodes.Status400BadRequest;
                    problemDetails.Title = "Validation Error";
                    problemDetails.Detail = validationException.Message;
                    break;

                case ArgumentException argumentException:
                    problemDetails.Status = StatusCodes.Status400BadRequest;
                    problemDetails.Title = "Invalid Argument";
                    problemDetails.Detail = argumentException.Message;
                    break;

                case ApplicationException applicationException:
                    problemDetails.Status = StatusCodes.Status500InternalServerError;
                    problemDetails.Title = "Application Error";
                    problemDetails.Detail = applicationException.Message;
                    break;

                default:
                    problemDetails.Status = StatusCodes.Status500InternalServerError;
                    problemDetails.Title = "Server Error";
                    problemDetails.Detail = "An unexpected error occurred. Please try again later.";
                    break;
            }

            // Set the response status code and write the error details to the response
            httpContext.Response.StatusCode = problemDetails.Status.Value;

            await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

            return true;
        }
    }

}
