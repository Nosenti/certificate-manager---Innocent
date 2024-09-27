using System;
using System.Collections.Generic;

namespace Backend.Entities;

public partial class Supplier
{
    public int Id { get; set; }

    public Guid Handle { get; set; }

    public string Name { get; set; } = null!;

    public string Index { get; set; } = null!;

    public string? City { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public byte[] RowVersion { get; set; } = null!;

    public virtual ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();
}
