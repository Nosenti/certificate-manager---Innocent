using Backend.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParticipantsController : ControllerBase
    {
        private readonly IParticipantService _participantService;

        public ParticipantsController(IParticipantService participantService)
        {
            _participantService = participantService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ParticipantDto>>> SearchParticipants([FromQuery] string? name, [FromQuery] string? userId, [FromQuery] string? department, [FromQuery] string? plant)
        {
            var participants = await _participantService.SearchParticipantsAsync(name, userId, department, plant);
            return Ok(participants);
        }
    }
}
