using Microsoft.AspNetCore.Mvc;
using WeddingInvitation.Api.Services;

namespace WeddingInvitation.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class InvitationController(IWeddingService weddingService) : ControllerBase
{
    [HttpGet]
    public IActionResult GetInvitation() => Ok(weddingService.GetInvitation());

    [HttpGet("timeline")]
    public IActionResult GetTimeline() => Ok(weddingService.GetTimeline());
}
