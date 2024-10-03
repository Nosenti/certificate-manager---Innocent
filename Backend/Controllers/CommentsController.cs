using Backend.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/certificates/{certificateHandle:guid}/comments")]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost]
        public async Task<ActionResult<CommentDto>> AddComment(Guid certificateHandle, [FromBody] CommentDto commentCreateDto)
        {
            if (commentCreateDto == null)
            {
                return BadRequest(new { Message = "The commentCreateDto field is required." });
            }

            commentCreateDto.CertificateHandle = certificateHandle;
            await _commentService.AddCommentAsync(commentCreateDto);
            return Ok(new { Message = "Comment added successfully" });
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetCommentsByCertificateHandle(Guid certificateHandle)
        {
            var comments = await _commentService.GetCommentsByCertificateHandleAsync(certificateHandle);
            return Ok(comments);
        }

    }
}
