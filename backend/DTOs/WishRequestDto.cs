using System.ComponentModel.DataAnnotations;

namespace WeddingInvitation.Api.DTOs;

public sealed class WishRequestDto
{
    [Required, StringLength(100, MinimumLength = 2)]
    public string GuestName { get; init; } = string.Empty;

    [Required, StringLength(500, MinimumLength = 3)]
    public string Message { get; init; } = string.Empty;
}
