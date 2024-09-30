using Backend.Dtos;
using Backend.Entities;
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
        public async Task AddCommentAsync(CommentDto commentCreateDto)
        {
            try
            {
                var certificate = await _certificateRepository.GetCertificateByHandleAsync(commentCreateDto.CertificateHandle);
                if (certificate == null)
                    throw new KeyNotFoundException("Certificate not found");

                var user = await _userRepository.GetUserByHandleAsync(commentCreateDto.UserHandle);
                if (user == null)
                    throw new KeyNotFoundException("User not found");

                Console.WriteLine($"Adding comment to CertificateId: {certificate.Id}, UserId: {user.Id}, Text: {commentCreateDto.Text}");

                var comment = new Comment
                {
                    CertificateId = certificate.Id,
                    UserId = user.Id,
                    Text = commentCreateDto.Text,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };



                await _commentRepository.AddCommentAsync(comment);
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
