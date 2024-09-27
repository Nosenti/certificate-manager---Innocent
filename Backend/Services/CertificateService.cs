using Backend.Dtos;
using Backend.Mappers;
using Backend.Repositories;

namespace Backend.Services
{
    public class CertificateService : ICertificateService
    {
        private readonly ICertificateRepository _certificateRepository;
        private readonly ISupplierRepository _supplierRepository;
        public CertificateService(ICertificateRepository certificateRepository, ISupplierRepository supplierRepository)
        {
            _certificateRepository = certificateRepository;
            _supplierRepository = supplierRepository;
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

            // Convert PDF document to byte array
            byte[] pdfBytes;
            using (var memoryStream = new MemoryStream())
            {
                await certificateCreateDto.PdfDocument.CopyToAsync(memoryStream);
                pdfBytes = memoryStream.ToArray();
            }
            var certificate = await _certificateRepository.CreateCertificateAsync(certificateCreateDto, supplier, pdfBytes);

            return certificate.ToDto();
        }

        public async Task<CertificateDto> UpdateCertificateAsync(CertificateEditDto certificateEditDto)
        {
            var supplier = await _supplierRepository.GetSupplierByHandleAsync(certificateEditDto.SupplierHandle);
            if (supplier == null)
            {
                throw new KeyNotFoundException("Supplier not found.");
            }
            byte[]? pdfBytes = null;

            if (certificateEditDto.PdfDocument != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await certificateEditDto.PdfDocument.CopyToAsync(memoryStream);
                    pdfBytes = memoryStream.ToArray();
                }
            }
            var certificate = await _certificateRepository.UpdateCertificateAsync(certificateEditDto, supplier, pdfBytes);

            return certificate.ToDto();

        }

    }
}
