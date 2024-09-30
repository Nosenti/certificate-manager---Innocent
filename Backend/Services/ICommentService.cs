using Backend.Dtos;

namespace Backend.Services
{
    public interface ICommentService
    {
        Task AddCommentAsync(CommentDto commentCreateDto);
        Task<IEnumerable<CommentDto>> GetCommentsByCertificateHandleAsync(Guid certificateHandle);
    }
}
