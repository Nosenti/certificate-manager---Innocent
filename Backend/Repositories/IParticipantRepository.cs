using Backend.Dtos;

namespace Backend.Repositories
{
    public interface IParticipantRepository
    {
        Task<IEnumerable<ParticipantDto>> SearchParticipantsAsync(string? name, string? userId, string? department, string? plant);
        Task<List<ParticipantDto>> GetParticipantsByHandlesAsync(List<Guid> participantHandles);
    }
}
