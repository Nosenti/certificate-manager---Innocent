using System;
using System.Collections.Generic;

namespace Backend.Entities;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public byte[] RowVersion { get; set; } = null!;

    public Guid Handle { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
