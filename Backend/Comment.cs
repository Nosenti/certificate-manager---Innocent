using System;
using System.Collections.Generic;

namespace Backend;

public partial class Comment
{
    public int CommentId { get; set; }

    public int? CertificateId { get; set; }

    public int? UserId { get; set; }

    public string CommentText { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public byte[] RowVersion { get; set; } = null!;

    public virtual Certificate? Certificate { get; set; }

    public virtual User? User { get; set; }
}
