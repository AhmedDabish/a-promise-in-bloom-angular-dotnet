using System.ComponentModel.DataAnnotations;

namespace WeddingInvitation.Api.Models;

public sealed class RsvpEntry
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string GuestName { get; set; } = string.Empty;

    [Required, Phone, MaxLength(30)]
    public string Phone { get; set; } = string.Empty;

    [Range(1, 8)]
    public int GuestCount { get; set; } = 1;

    [MaxLength(500)]
    public string? Message { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
