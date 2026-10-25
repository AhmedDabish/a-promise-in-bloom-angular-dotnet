using Microsoft.EntityFrameworkCore;
using WeddingInvitation.Api.Models;

namespace WeddingInvitation.Api.Data;

public sealed class WeddingDbContext(DbContextOptions<WeddingDbContext> options) : DbContext(options)
{
    public DbSet<RsvpEntry> Rsvps => Set<RsvpEntry>();
    public DbSet<GuestWish> Wishes => Set<GuestWish>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RsvpEntry>().HasIndex(rsvp => rsvp.CreatedAt);
        modelBuilder.Entity<GuestWish>().HasIndex(wish => wish.CreatedAt);
    }
}
