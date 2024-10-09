namespace Backend.Entities;

public partial class Comment
{
    public int Id { get; set; }

    public Guid Handle { get; set; }

    public int CertificateId { get; set; }

    public int UserId { get; set; }

    public string Text { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public byte[] RowVersion { get; set; } = null!;

    public virtual Certificate Certificate { get; set; } = null;

    public virtual User User { get; set; } = null!;
}
