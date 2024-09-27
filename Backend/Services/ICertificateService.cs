using Backend.Dtos;

namespace Backend.Services
{
    public interface ICertificateService
    {
        Task<IEnumerable<CertificateDto>> GetAllCertificatesAsync();
        Task<CertificateDto> GetCertificateByHandleAsync(Guid handle);
        Task<bool> DeleteCertificateByHandleAsync(Guid handle);
        Task<CertificateDto> CreateCertificateAsync(CertificateCreateDto certificateCreateDto);
    }
}
