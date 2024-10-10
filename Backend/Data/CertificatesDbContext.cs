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

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Certificate>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Certific__3214EC07FDD677B7");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Handle).HasDefaultValueSql("(newid())");
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.SupplierId).HasColumnName("SupplierID");
            entity.Property(e => e.Type).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Supplier).WithMany(p => p.Certificates)
                .HasForeignKey(d => d.SupplierId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Certifica__Suppl__4222D4EF");
            entity.HasMany(c => c.Comments)
            .WithOne(c => c.Certificate)
            .HasForeignKey(c => c.CertificateId)
            .OnDelete(DeleteBehavior.Cascade);


        });

        modelBuilder.Entity<CertificateParticipant>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Certific__3214EC0739D82155");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Handle).HasDefaultValueSql("(newid())");
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Certificate).WithMany(p => p.CertificateParticipants)
                .HasForeignKey(d => d.CertificateId)
                .HasConstraintName("FK__Certifica__Certi__5165187F");

            entity.HasOne(d => d.Participant).WithMany(p => p.CertificateParticipants)
                .HasForeignKey(d => d.ParticipantId)
                .HasConstraintName("FK__Certifica__Parti__52593CB8");

        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Comments__3214EC07E6AE7C24");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Handle).HasDefaultValueSql("(newid())");
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Certificate).WithMany(p => p.Comments)
                .HasForeignKey(d => d.CertificateId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_CertificateId");

            entity.HasOne(d => d.User).WithMany(p => p.Comments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserId");
        });

        modelBuilder.Entity<Participant>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Particip__3214EC07BAD05BDD");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Department).HasMaxLength(100);
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Handle).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Plant).HasMaxLength(50);
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UserId).HasMaxLength(50);
        });

        modelBuilder.Entity<Supplier>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Supplier__3214EC076A6E2C5C");

            entity.Property(e => e.City).HasMaxLength(255);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Handle).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Index).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC07F45654D3");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Handle).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");


        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
