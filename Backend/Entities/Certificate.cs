using System;
using System.Collections.Generic;

namespace Backend.Entities;

public partial class Certificate
{
    public int CertificateId { get; set; }

    public int? SupplierId { get; set; }

    public string CertificateType { get; set; } = null!;

    public DateOnly ValidFrom { get; set; }

    public DateOnly ValidTo { get; set; }

    public byte[]? PdfDocument { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public byte[] RowVersion { get; set; } = null!;

    public Guid Handle { get; set; }

    public virtual ICollection<CertificateParticipant> CertificateParticipants { get; set; } = new List<CertificateParticipant>();

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual Supplier? Supplier { get; set; }
}
