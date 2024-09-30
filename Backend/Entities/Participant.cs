using System;
using System.Collections.Generic;

namespace Backend.Entities;

public partial class Participant
{
    public int Id { get; set; }

    public Guid Handle { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public byte[] RowVersion { get; set; } = null!;

    public string? Plant { get; set; }

    public string? Department { get; set; }

    public string? UserId { get; set; }

    public virtual ICollection<CertificateParticipant> CertificateParticipants { get; set; } = new List<CertificateParticipant>();
}
