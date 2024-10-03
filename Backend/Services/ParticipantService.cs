using Backend.Dtos;
using Backend.Repositories;

namespace Backend.Services
{
    public class ParticipantService : IParticipantService
    {
        private readonly IParticipantRepository _participantRepository;

        public ParticipantService(IParticipantRepository participantRepository)
        {
            _participantRepository = participantRepository;
        }
        public async Task<IEnumerable<ParticipantDto>> SearchParticipantsAsync(string? name, string? userId, string? department, string? plant)
        {
            var participants = await _participantRepository.SearchParticipantsAsync(name, userId, department, plant);
            return participants;
        }
    }
}
