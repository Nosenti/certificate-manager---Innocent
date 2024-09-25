using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public partial class CertificatesDbContext : DbContext
{
    public CertificatesDbContext()
    {
    }

    public CertificatesDbContext(DbContextOptions<CertificatesDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Certificate> Certificates { get; set; }

    public virtual DbSet<CertificateParticipant> CertificateParticipants { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Participant> Participants { get; set; }

    public virtual DbSet<Supplier> Suppliers { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Certificate>(entity =>
        {
            entity.HasKey(e => e.CertificateId).HasName("PK__Certific__BBF8A7E1C15CBD7D");

            entity.Property(e => e.CertificateId).HasColumnName("CertificateID");
            entity.Property(e => e.CertificateType).HasMaxLength(255);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.SupplierId).HasColumnName("SupplierID");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Supplier).WithMany(p => p.Certificates)
                .HasForeignKey(d => d.SupplierId)
                .HasConstraintName("FK__Certifica__Suppl__3B75D760");
        });

        modelBuilder.Entity<CertificateParticipant>(entity =>
        {
            entity.HasKey(e => e.CertificateParticipantId).HasName("PK__Certific__E17D18FF9C25BB33");

            entity.Property(e => e.CertificateParticipantId).HasColumnName("CertificateParticipantID");
            entity.Property(e => e.CertificateId).HasColumnName("CertificateID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ParticipantId).HasColumnName("ParticipantID");
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Certificate).WithMany(p => p.CertificateParticipants)
                .HasForeignKey(d => d.CertificateId)
                .HasConstraintName("FK__Certifica__Certi__47DBAE45");

            entity.HasOne(d => d.Participant).WithMany(p => p.CertificateParticipants)
                .HasForeignKey(d => d.ParticipantId)
                .HasConstraintName("FK__Certifica__Parti__48CFD27E");
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.CommentId).HasName("PK__Comments__C3B4DFAAB411CE75");

            entity.Property(e => e.CommentId).HasColumnName("CommentID");
            entity.Property(e => e.CertificateId).HasColumnName("CertificateID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Certificate).WithMany(p => p.Comments)
                .HasForeignKey(d => d.CertificateId)
                .HasConstraintName("FK__Comments__Certif__4D94879B");

            entity.HasOne(d => d.User).WithMany(p => p.Comments)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Comments__UserID__4E88ABD4");
        });

        modelBuilder.Entity<Participant>(entity =>
        {
            entity.HasKey(e => e.ParticipantId).HasName("PK__Particip__7227997EB5221478");

            entity.Property(e => e.ParticipantId).HasColumnName("ParticipantID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ParticipantEmail).HasMaxLength(255);
            entity.Property(e => e.ParticipantName).HasMaxLength(255);
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<Supplier>(entity =>
        {
            entity.HasKey(e => e.SupplierId).HasName("PK__Supplier__4BE6669403AF2CBA");

            entity.Property(e => e.SupplierId).HasColumnName("SupplierID");
            entity.Property(e => e.City).HasMaxLength(255);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.SupplierIndex).HasMaxLength(50);
            entity.Property(e => e.SupplierName).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCAC938F49B8");

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UserName).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
