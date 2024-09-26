namespace Backend.Dtos
{
    public class CertificateDto
    {
        public int CertificateID { get; set; }

        public string CertificateType { get; set; }

        public DateOnly ValidFrom { get; set; }

        public DateOnly ValidTo { get; set; }

        public string SupplierName { get; set; }

        public string SupplierCity { get; set; }

        public List<ParticipantDto> Participants { get; set; }
    }
}
