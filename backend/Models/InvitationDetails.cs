namespace WeddingInvitation.Api.Models;

public sealed record InvitationDetails(
    string Groom,
    string Bride,
    string Families,
    DateTimeOffset Date,
    string DateLabel,
    string TimeLabel,
    string VenueName,
    string VenueAddress,
    string MapsUrl,
    string WhatsAppPhone,
    string Verse);

public sealed record TimelineEvent(int Id, string Time, string Title, string Description, string Icon);
