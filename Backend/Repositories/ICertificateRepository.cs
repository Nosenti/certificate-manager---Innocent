using Backend.Dtos;

namespace Backend.Repositories
{
    public interface ICertificateRepository
    {
        Task<IEnumerable<CertificateDto>> GetAllCertificatesAsync();
        Task<CertificateDto> GetCertificateByHandleAsync(Guid handle);
        Task<bool> DeleteCertificateByHandleAsync(Guid handle);
        Task<CertificateDto> CreateCertificateAsync(CertificateCreateDto certificateCreateDto, SupplierDto supplier, List<ParticipantDto> participants, byte[] pdfBytes);
        Task<CertificateDto> UpdateCertificateAsync(Guid handle, CertificateEditDto certificateEditDto, SupplierDto supplier, List<ParticipantDto> participants, byte[]? pdfBytes);
    }
}
