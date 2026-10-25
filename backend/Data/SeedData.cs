using Microsoft.EntityFrameworkCore;
using WeddingInvitation.Api.Models;

namespace WeddingInvitation.Api.Data;

public static class SeedData
{
    public static async Task InitializeAsync(WeddingDbContext db)
    {
        if (await db.Wishes.AnyAsync()) return;
        db.Wishes.AddRange(
            new GuestWish { GuestName = "مريم", Message = "ألف مبروك يا أحلى عروسين، ربنا يسعدكم دائمًا 💛", CreatedAt = DateTimeOffset.UtcNow.AddDays(-2) },
            new GuestWish { GuestName = "عمر", Message = "بارك الله لكما وبارك عليكما وجمع بينكما في خير", CreatedAt = DateTimeOffset.UtcNow.AddDays(-1) },
            new GuestWish { GuestName = "سارة", Message = "ليلتكم أجمل بداية لحكاية عمر.. بحبكم 🤍", CreatedAt = DateTimeOffset.UtcNow.AddHours(-4) }
        );
        await db.SaveChangesAsync();
    }
}
