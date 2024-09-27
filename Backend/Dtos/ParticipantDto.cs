namespace Backend.Dtos
{
    public class ParticipantDto
    {
        public Guid Handle { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Department { get; set; }

        public string Plant { get; set; }
    }
}
