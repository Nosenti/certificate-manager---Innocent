using Backend.Dtos;
using Backend.Entities;

namespace Backend.Mappers
{
    public static class ParticipantMapper
    {
        public static ParticipantDto ToDto(this Participant participant)
        {
            return new ParticipantDto
            {
                Handle = participant.Handle,
                Name = participant.Name ?? "Unknown",
                Email = participant.Email ?? "Unknown",
                Department = "Unknown",
                Plant = "Unknown"
            };
        }

        public static List<ParticipantDto> ToDtoList(this IEnumerable<Participant> participants)
        {
            return participants.Select(participant => participant.ToDto()).ToList();
        }
    }
}

