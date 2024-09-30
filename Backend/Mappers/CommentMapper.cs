using Backend.Dtos;
using Backend.Entities;

namespace Backend.Mappers
{
    public static class CommentMapper
    {
        public static CommentDto ToDto(this Comment comment)
        {
            return new CommentDto
            {
                CertificateHandle = comment.Certificate.Handle,
                UserHandle = comment.User.Handle,
                Text = comment.Text,
            };
        }

        public static List<CommentDto> ToDtoList(this IEnumerable<Comment> comments)
        {
            return comments.Select(comment => comment.ToDto()).ToList();
        }
    }
}

