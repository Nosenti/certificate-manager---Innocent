using Backend.Entities;

namespace Backend.Repositories
{
    public interface IParticipantRepository
    {
        Task<IEnumerable<Participant>> SearchParticipantsAsync(string? name, string? userId, string? department, string? plant);
        Task<List<Participant>> GetParticipantsByHandlesAsync(List<Guid> participantHandles);
    }
}
