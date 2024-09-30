﻿using Backend.Dtos;
using Backend.Entities;

namespace Backend.Repositories
{
    public interface ICertificateRepository
    {
        Task<IEnumerable<CertificateDto>> GetAllCertificatesAsync();
        Task<CertificateDto> GetCertificateByHandleAsync(Guid handle);
        Task<bool> DeleteCertificateByHandleAsync(Guid handle);
        Task<Certificate> CreateCertificateAsync(CertificateCreateDto certificateCreateDto, SupplierDto supplier, List<ParticipantDto> participants, byte[] pdfBytes);
        Task<Certificate> UpdateCertificateAsync(CertificateEditDto certificateEditDto, SupplierDto supplier, List<ParticipantDto> participants, byte[]? pdfBytes);
    }
}
