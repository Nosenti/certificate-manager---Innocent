namespace Backend.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public Guid Handle { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
