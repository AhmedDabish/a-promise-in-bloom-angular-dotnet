using Microsoft.AspNetCore.Mvc;
using WeddingInvitation.Api.DTOs;
using WeddingInvitation.Api.Services;

namespace WeddingInvitation.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class RsvpController(IWeddingService weddingService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] RsvpRequestDto request, CancellationToken cancellationToken)
    {
        var entry = await weddingService.CreateRsvpAsync(request, cancellationToken);
        return Created($"/api/rsvp/{entry.Id}", new { entry.Id, entry.GuestName, entry.GuestCount, entry.CreatedAt });
    }
}
