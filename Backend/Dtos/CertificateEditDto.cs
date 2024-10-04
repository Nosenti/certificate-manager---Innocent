using Microsoft.AspNetCore.Mvc;

namespace Backend.Dtos
{
    public class CertificateEditDto
    {
        public string Type { get; set; }
        public DateOnly ValidFrom { get; set; }
        public DateOnly ValidTo { get; set; }
        public Guid SupplierHandle { get; set; }
        public IFormFile? PdfDocument { get; set; }
        [FromForm]
        public List<Guid>? ParticipantHandles { get; set; }
    }
}
