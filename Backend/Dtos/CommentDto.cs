namespace Backend.Dtos
{
    public class CommentDto
    {
        public Guid CertificateHandle { get; set; }
        public Guid UserHandle { get; set; }
        public string Text { get; set; }
    }
}
