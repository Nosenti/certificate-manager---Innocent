namespace Backend.Dtos
{
    public class SupplierDto
    {
        public string Name { get; set; } = null!;

        public string Index { get; set; } = null!;

        public string? City { get; set; }

        public Guid Handle { get; set; }
    }
}
