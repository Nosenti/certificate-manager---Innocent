using System;
using System.Collections.Generic;

namespace Backend.Entities;

public partial class Participant
{
    public int ParticipantId { get; set; }

    public string ParticipantName { get; set; } = null!;

    public string ParticipantEmail { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public byte[] RowVersion { get; set; } = null!;

    public virtual ICollection<CertificateParticipant> CertificateParticipants { get; set; } = new List<CertificateParticipant>();
}
