using Dataset_Manager.Models;
using Microsoft.EntityFrameworkCore;

namespace Dataset_Manager.Context
{
    public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<EntityDefinition> Entities { get; set; }
        public DbSet<AttributeDefinition> Attributes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EntityDefinition>()
                .HasIndex(e => new { e.ProjectId, e.Name })
                .IsUnique();

            // EntityDefinition -> Project (Many-to-One)
            modelBuilder.Entity<EntityDefinition>()
                .HasOne(e => e.Project)
                .WithMany(p => p.Entities)
                .HasForeignKey(e => e.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            // EntityDefinition -> Attributes
            modelBuilder.Entity<AttributeDefinition>()
                .HasIndex(a => new { a.EntityId, a.Name })
                .IsUnique();

            // EntityDefinition -> AttributeDefinition (One-to-Many)
            modelBuilder.Entity<EntityDefinition>()
                .HasMany(e => e.Attributes)
                .WithOne(a => a.Entity)
                .HasForeignKey(a => a.EntityId)
                .OnDelete(DeleteBehavior.Cascade);

            // Self-referencing parent/children
            modelBuilder.Entity<EntityDefinition>()
                .HasOne(e => e.ParentEntity)
                .WithMany(e => e.SubEntities)
                .HasForeignKey(e => e.ParentEntityId)
                .OnDelete(DeleteBehavior.Restrict); // évite cascade cycles

            // Enum en string 
            modelBuilder.Entity<AttributeDefinition>()
                .Property(a => a.Type)
                .HasConversion<string>()
                .HasMaxLength(50);
        }
    }
}
