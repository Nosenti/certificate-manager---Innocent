using Backend.Dtos;
using Backend.Entities;

namespace Backend.Mappers
{
    public static class CertificateMapper
    {
        public static CertificateDto ToCertificateDto(this Certificate certificate)
        {
            return new CertificateDto
            {
                CertificateID = certificate.CertificateId,
                CertificateType = certificate.CertificateType,
                ValidFrom = certificate.ValidFrom,
                ValidTo = certificate.ValidTo,
                SupplierName = certificate.Supplier?.SupplierName ?? "Unknown Supplier",
                SupplierCity = certificate.Supplier?.City ?? "Unknown City",
                Participants = certificate.CertificateParticipants?.Select(cp => new ParticipantDto
                {
                    ParticipantID = cp.Participant?.ParticipantId ?? 0,
                    ParticipantName = cp.Participant?.ParticipantName ?? "Unknown",
                    ParticipantEmail = cp.Participant?.ParticipantEmail ?? "Unknown",
                    Department = "Unknown",
                    Plant = "Unknown"
                }).ToList() ?? new List<ParticipantDto>()
            };
        }

        public static List<CertificateDto> ToCertificateDtoList(this IEnumerable<Certificate> certificates)
        {
            return certificates.Select(certificate => certificate.ToCertificateDto()).ToList();
        }
    }
}
