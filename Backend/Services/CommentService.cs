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
                int certificateId = await _commentRepository.GetCertificateIdByHandleAsync(commentCreateDto.CertificateHandle);

                int userId = await _commentRepository.GetUserIdByHandleAsync(commentCreateDto.UserHandle);

                var comment = new Comment
                {
                    CertificateId = certificateId,
                    UserId = userId,
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
