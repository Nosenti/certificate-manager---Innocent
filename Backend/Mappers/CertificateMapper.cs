using Backend.Dtos;
using Backend.Entities;

namespace Backend.Mappers
{
    public static class CertificateMapper
    {
        public static CertificateDto ToDto(this Certificate certificate)
        {
            return new CertificateDto
            {
                Handle = certificate.Handle,
                Type = certificate.Type,
                ValidFrom = certificate.ValidFrom,
                ValidTo = certificate.ValidTo,
                Supplier = certificate.Supplier != null ? certificate.Supplier.ToDto() : null,
                PdfDocument = certificate.PdfDocument,
                Participants = certificate.CertificateParticipants?.Select(cp => cp.Participant != null ? cp.Participant.ToDto() : new ParticipantDto()).ToList() ?? new List<ParticipantDto>(),
                Comments = certificate.Comments?.Select(c => new CommentDto
                {
                    CertificateHandle = c.Certificate.Handle,
                    UserHandle = c.User != null ? c.User.Handle : Guid.Empty,
                    UserName = c.User != null ? c.User.Name : null,
                    Text = c.Text
                }).ToList() ?? new List<CommentDto>()
            };
        }

        public static List<CertificateDto> ToDtoList(this IEnumerable<Certificate> certificates)
        {
            return certificates.Select(certificate => certificate.ToDto()).ToList();
        }
    }
}
