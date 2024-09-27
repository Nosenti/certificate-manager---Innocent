﻿using Backend.Dtos;
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
                CertificateType = certificate.CertificateType,
                ValidFrom = certificate.ValidFrom,
                ValidTo = certificate.ValidTo,
                SupplierName = certificate.Supplier?.SupplierName ?? "Unknown Supplier",
                SupplierCity = certificate.Supplier?.City ?? "Unknown City",
                PdfDocument = certificate.PdfDocument,
                Participants = certificate.CertificateParticipants?.Select(cp => cp.Participant != null ? cp.Participant.ToDto() : new ParticipantDto()).ToList() ?? new List<ParticipantDto>()
            };
        }

        public static List<CertificateDto> ToDtoList(this IEnumerable<Certificate> certificates)
        {
            return certificates.Select(certificate => certificate.ToDto()).ToList();
        }
    }
}
