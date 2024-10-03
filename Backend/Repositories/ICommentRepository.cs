using Backend.Dtos;
using Backend.Entities;

namespace Backend.Repositories
{
    public interface ICommentRepository
    {
        Task<CommentDto> AddCommentAsync(Comment comment);
        Task<IEnumerable<CommentDto>> GetCommentsByCertificateHandleAsync(Guid certificateHandle);
        Task<int> GetCertificateIdByHandleAsync(Guid certificateHandle);
        Task<int> GetUserIdByHandleAsync(Guid userHandle);
    }
}
