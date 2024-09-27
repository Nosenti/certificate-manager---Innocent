namespace Backend.Dtos
{
    public class CertificateDto
    {
        public Guid Handle { get; set; }

        public string CertificateType { get; set; }

        public DateOnly ValidFrom { get; set; }

        public DateOnly ValidTo { get; set; }

        public string SupplierName { get; set; }

        public string SupplierCity { get; set; }

        public byte[]? PdfDocument { get; set; }

        public List<ParticipantDto> Participants { get; set; }

    }
}
