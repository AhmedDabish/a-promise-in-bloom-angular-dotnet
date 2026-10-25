using WeddingInvitation.Api.DTOs;
using WeddingInvitation.Api.Models;

namespace WeddingInvitation.Api.Services;

public interface IWeddingService
{
    InvitationDetails GetInvitation();
    IReadOnlyList<TimelineEvent> GetTimeline();
    Task<RsvpEntry> CreateRsvpAsync(RsvpRequestDto request, CancellationToken cancellationToken);
    Task<IReadOnlyList<GuestWish>> GetWishesAsync(CancellationToken cancellationToken);
    Task<GuestWish> CreateWishAsync(WishRequestDto request, CancellationToken cancellationToken);
}
