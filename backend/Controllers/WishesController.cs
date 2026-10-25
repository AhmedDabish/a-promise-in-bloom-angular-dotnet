using Microsoft.AspNetCore.Mvc;
using WeddingInvitation.Api.DTOs;
using WeddingInvitation.Api.Services;

namespace WeddingInvitation.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class WishesController(IWeddingService weddingService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken) =>
        Ok(await weddingService.GetWishesAsync(cancellationToken));

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] WishRequestDto request, CancellationToken cancellationToken)
    {
        var wish = await weddingService.CreateWishAsync(request, cancellationToken);
        return Created($"/api/wishes/{wish.Id}", wish);
    }
}
