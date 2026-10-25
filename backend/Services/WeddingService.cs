using Microsoft.EntityFrameworkCore;
using WeddingInvitation.Api.Data;
using WeddingInvitation.Api.DTOs;
using WeddingInvitation.Api.Models;

namespace WeddingInvitation.Api.Services;

public sealed class WeddingService(WeddingDbContext db) : IWeddingService
{
    public InvitationDetails GetInvitation() => new(
        "يوسف", "ليلى", "بكل الحب تتشرف عائلتا الأحمد والسيد بدعوتكم",
        new DateTimeOffset(2026, 12, 24, 19, 30, 0, TimeSpan.FromHours(2)),
        "الخميس ٢٤ ديسمبر ٢٠٢٦", "السابعة والنصف مساءً",
        "قاعة الياسمين — فندق النيل", "كورنيش النيل، جاردن سيتي، القاهرة",
        "https://maps.google.com/?q=Garden+City+Cairo", "201000000000",
        "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا");

    public IReadOnlyList<TimelineEvent> GetTimeline() =>
    [
        new(1, "٧:٠٠ م", "استقبال الضيوف", "نستقبلكم بفرح ومحبة", "✧"),
        new(2, "٨:٠٠ م", "عقد القران", "لحظتنا المنتظرة", "♡"),
        new(3, "٨:٣٠ م", "الزفة الملكية", "نحتفل ببداية حكايتنا", "✿"),
        new(4, "٩:٣٠ م", "العشاء والاحتفال", "ليلة تجمعنا بكم", "❋")
    ];

    public async Task<RsvpEntry> CreateRsvpAsync(RsvpRequestDto request, CancellationToken cancellationToken)
    {
        var entry = new RsvpEntry
        {
            GuestName = request.GuestName.Trim(),
            Phone = request.Phone.Trim(),
            GuestCount = request.GuestCount,
            Message = string.IsNullOrWhiteSpace(request.Message) ? null : request.Message.Trim()
        };
        db.Rsvps.Add(entry);
        await db.SaveChangesAsync(cancellationToken);
        return entry;
    }

    public async Task<IReadOnlyList<GuestWish>> GetWishesAsync(CancellationToken cancellationToken) =>
        await db.Wishes.AsNoTracking().OrderByDescending(wish => wish.Id).Take(30).ToListAsync(cancellationToken);

    public async Task<GuestWish> CreateWishAsync(WishRequestDto request, CancellationToken cancellationToken)
    {
        var wish = new GuestWish { GuestName = request.GuestName.Trim(), Message = request.Message.Trim() };
        db.Wishes.Add(wish);
        await db.SaveChangesAsync(cancellationToken);
        return wish;
    }
}
