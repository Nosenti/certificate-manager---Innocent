namespace Backend.Dtos
{
    public class ParticipantDto
    {
        public Guid Handle { get; set; }

        public string ParticipantName { get; set; }

        public string ParticipantEmail { get; set; }

        public string Department { get; set; }

        public string Plant { get; set; }
    }
}
