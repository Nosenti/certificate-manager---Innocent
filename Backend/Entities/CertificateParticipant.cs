using System;
using System.Collections.Generic;

namespace Backend.Entities;

public partial class CertificateParticipant
{
    public int Id { get; set; }

    public Guid Handle { get; set; }

    public int? CertificateId { get; set; }

    public int? ParticipantId { get; set; }

    public DateOnly AssignedDate { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public byte[] RowVersion { get; set; } = null!;

    public virtual Certificate? Certificate { get; set; }

    public virtual Participant? Participant { get; set; }
}
