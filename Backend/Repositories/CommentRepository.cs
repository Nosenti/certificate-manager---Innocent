using Backend.Data;
using Backend.Dtos;
using Backend.Entities;
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

        public async Task<Comment> AddCommentAsync(Comment comment)
        {
            //var comment = new Comment
            //{
            //    CertificateId = (await _context.Certificates.FirstOrDefaultAsync(c => c.Handle == commentDto.CertificateHandle))?.Id ?? 0,
            //    UserId = (await _context.Users.FirstOrDefaultAsync(u => u.Handle == commentDto.UserHandle))?.Id ?? 0,
            //    Text = commentDto.Text,
            //    CreatedAt = DateTime.UtcNow,
            //    UpdatedAt = DateTime.UtcNow
            //};

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return comment;
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
    }
}
