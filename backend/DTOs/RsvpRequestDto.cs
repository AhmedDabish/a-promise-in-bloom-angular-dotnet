using System.ComponentModel.DataAnnotations;

namespace WeddingInvitation.Api.DTOs;

public sealed class RsvpRequestDto
{
    [Required, StringLength(100, MinimumLength = 2)]
    public string GuestName { get; init; } = string.Empty;

    [Required, Phone, StringLength(30)]
    public string Phone { get; init; } = string.Empty;

    [Range(1, 8)]
    public int GuestCount { get; init; } = 1;

    [StringLength(500)]
    public string? Message { get; init; }
}
