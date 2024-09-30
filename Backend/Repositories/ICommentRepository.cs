using Backend.Dtos;
using Backend.Entities;

namespace Backend.Repositories
{
    public interface ICommentRepository
    {
        Task<Comment> AddCommentAsync(Comment comment);
        Task<IEnumerable<CommentDto>> GetCommentsByCertificateHandleAsync(Guid certificateHandle);
    }
}
