using System.ComponentModel.DataAnnotations;

namespace WeddingInvitation.Api.Models;

public sealed class GuestWish
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string GuestName { get; set; } = string.Empty;

    [Required, MaxLength(500)]
    public string Message { get; set; } = string.Empty;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
