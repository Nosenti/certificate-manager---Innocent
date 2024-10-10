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
                Name = participant.Name,
                Email = participant.Email,
                Department = participant.Department,
                Plant = participant.Plant,
                UserId = participant.UserId
            };
        }

        public static List<ParticipantDto> ToDtoList(this IEnumerable<Participant> participants)
        {
            return participants.Select(participant => participant.ToDto()).ToList();
        }
    }
}

