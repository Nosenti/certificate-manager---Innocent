namespace Backend.Dtos
{
    public class CertificateDto
    {
        public Guid Handle { get; set; }

        public string CertificateType { get; set; }

        public DateOnly ValidFrom { get; set; }

        public DateOnly ValidTo { get; set; }

        public SupplierDto Supplier { get; set; }

        public byte[]? PdfDocument { get; set; }

        public List<ParticipantDto> Participants { get; set; }

    }
}
