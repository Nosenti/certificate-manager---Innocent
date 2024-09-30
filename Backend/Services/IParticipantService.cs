using Backend.Dtos;

namespace Backend.Services
{
    public interface IParticipantService
    {
        Task<IEnumerable<ParticipantDto>> SearchParticipantsAsync(string? name, string? userId, string? department, string? plant);
    }
}
