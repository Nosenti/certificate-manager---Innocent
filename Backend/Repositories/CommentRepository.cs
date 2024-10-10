using Backend.Data;
using Backend.Dtos;
using Backend.Entities;
using Backend.Mappers;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly CertificatesDbContext _context;

        public CommentRepository(CertificatesDbContext context)
        {
            _context = context;
        }

        public async Task<CommentDto> AddCommentAsync(Comment comment)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Id == comment.UserId);
            if (!userExists)
            {
                throw new InvalidOperationException($"User with ID {comment.UserId} does not exist.");
            }
            var certificateExists = await _context.Certificates.AnyAsync(c => c.Id == comment.CertificateId);
            if (!certificateExists)
            {
                throw new InvalidOperationException($"Certificate with ID {comment.CertificateId} does not exist.");
            }
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return comment.ToDto();
        }

        public async Task<IEnumerable<CommentDto>> GetCommentsByCertificateHandleAsync(Guid certificateHandle)
        {
            var certificate = await _context.Certificates.FirstOrDefaultAsync(c => c.Handle == certificateHandle);
            if (certificate == null) return Enumerable.Empty<CommentDto>();

            return await _context.Comments
                .Where(c => c.CertificateId == certificate.Id)
                .Select(c => new CommentDto
                {
                    CertificateHandle = c.Certificate.Handle,
                    UserHandle = c.User.Handle,
                    Text = c.Text
                }).ToListAsync();
        }
        public async Task<int> GetCertificateIdByHandleAsync(Guid certificateHandle)
        {
            var certificate = await _context.Certificates
                .FirstOrDefaultAsync(c => c.Handle == certificateHandle);
            return certificate?.Id ?? throw new KeyNotFoundException("Certificate not found");
        }

        public async Task<int> GetUserIdByHandleAsync(Guid userHandle)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Handle == userHandle);
            return user?.Id ?? throw new KeyNotFoundException("User not found");
        }
    }
}
