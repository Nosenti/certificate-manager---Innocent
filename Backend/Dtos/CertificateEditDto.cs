namespace Backend.Dtos
{
    public class CertificateEditDto
    {
        public Guid Handle { get; set; }
        public string CertificateType { get; set; }
        public DateOnly ValidFrom { get; set; }
        public DateOnly ValidTo { get; set; }
        public Guid SupplierHandle { get; set; }
        public IFormFile? PdfDocument { get; set; }
    }
}
