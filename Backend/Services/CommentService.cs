using Backend.Dtos;
using Backend.Entities;
using Backend.Mappers;
using Backend.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly ICertificateRepository _certificateRepository;
        private readonly IUserRepository _userRepository;

        public CommentService(ICommentRepository commentRepository, ICertificateRepository certificateRepository, IUserRepository userRepository)
        {
            _commentRepository = commentRepository;
            _certificateRepository = certificateRepository;
            _userRepository = userRepository;
        }
        public async Task<CommentDto> AddCommentAsync(CommentDto commentCreateDto)
        {
            try
            {
                var certificateDto = await _certificateRepository.GetCertificateByHandleAsync(commentCreateDto.CertificateHandle);
                if (certificateDto == null)
                    throw new KeyNotFoundException("Certificate not found");

                var userDto = await _userRepository.GetUserByHandleAsync(commentCreateDto.UserHandle);
                if (userDto == null)
                    throw new KeyNotFoundException("User not found");

                var comment = new Comment
                {
                    CertificateId = certificateDto.Id,
                    UserId = userDto.Id,
                    Text = commentCreateDto.Text,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                await _commentRepository.AddCommentAsync(comment);
                return comment.ToDto();

            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($"Database Update Exception: {ex.InnerException?.Message}");
                throw;
            }

        }

        public async Task<IEnumerable<CommentDto>> GetCommentsByCertificateHandleAsync(Guid certificateHandle)
        {
            return await _commentRepository.GetCommentsByCertificateHandleAsync(certificateHandle);
        }

    }
}
