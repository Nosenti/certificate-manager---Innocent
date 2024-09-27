namespace Backend.Dtos
{
    public class SupplierDto
    {

        public string SupplierName { get; set; } = null!;

        public string SupplierIndex { get; set; } = null!;

        public string? City { get; set; }

        public Guid Handle { get; set; }
    }
}
