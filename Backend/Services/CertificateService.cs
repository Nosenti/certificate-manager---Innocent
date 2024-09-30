using Backend.Dtos;
using Backend.Helpers;
using Backend.Mappers;
using Backend.Repositories;

namespace Backend.Services
{
    public class CertificateService : ICertificateService
    {
        private readonly ICertificateRepository _certificateRepository;
        private readonly ISupplierRepository _supplierRepository;
        private readonly IParticipantRepository _participantRepository;
        public CertificateService(ICertificateRepository certificateRepository, ISupplierRepository supplierRepository, IParticipantRepository participantRepository)
        {
            _certificateRepository = certificateRepository;
            _supplierRepository = supplierRepository;
            _participantRepository = participantRepository;
        }

        public async Task<IEnumerable<CertificateDto>> GetAllCertificatesAsync()
        {
            return await _certificateRepository.GetAllCertificatesAsync();
        }

        public async Task<CertificateDto> GetCertificateByHandleAsync(Guid handle)
        {
            return await _certificateRepository.GetCertificateByHandleAsync(handle);
        }

        public async Task<bool> DeleteCertificateByHandleAsync(Guid handle)
        {
            return await _certificateRepository.DeleteCertificateByHandleAsync(handle);
        }

        public async Task<CertificateDto> CreateCertificateAsync(CertificateCreateDto certificateCreateDto)
        {
            var supplier = await _supplierRepository.GetSupplierByHandleAsync(certificateCreateDto.SupplierHandle);
            if (supplier == null)
            {
                throw new KeyNotFoundException("Supplier not found.");
            }

            var participants = await _participantRepository.GetParticipantsByHandlesAsync(certificateCreateDto.ParticipantHandles);

            byte[]? pdfBytes = await FileHelper.ConvertToByteArrayAsync(certificateCreateDto.PdfDocument);
            var certificate = await _certificateRepository.CreateCertificateAsync(certificateCreateDto, supplier, participants, pdfBytes);

            return certificate.ToDto();
        }

        public async Task<CertificateDto> UpdateCertificateAsync(CertificateEditDto certificateEditDto)
        {
            var supplier = await _supplierRepository.GetSupplierByHandleAsync(certificateEditDto.SupplierHandle);
            if (supplier == null)
            {
                throw new KeyNotFoundException("Supplier not found.");
            }
            var participants = await _participantRepository.GetParticipantsByHandlesAsync(certificateEditDto.ParticipantHandles);

            byte[]? pdfBytes = await FileHelper.ConvertToByteArrayAsync(certificateEditDto.PdfDocument);
            var certificate = await _certificateRepository.UpdateCertificateAsync(certificateEditDto, supplier, participants, pdfBytes);

            return certificate.ToDto();

        }


    }
}
