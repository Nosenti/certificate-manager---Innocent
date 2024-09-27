using Backend.Data;
using Backend.Dtos;
using Backend.Entities;
using Backend.Mappers;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class CertificateRepository : ICertificateRepository
    {
        private readonly CertificatesDbContext _context;

        public CertificateRepository(CertificatesDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CertificateDto>> GetAllCertificatesAsync()
        {
            var certificates = await _context.Certificates.Include(c => c.CertificateParticipants).ToListAsync();
            return certificates.ToDtoList();
        }

        public async Task<CertificateDto> GetCertificateByHandleAsync(Guid handle)
        {
            var certificate = await _context.Certificates.Include(c => c.Supplier).Include(c => c.CertificateParticipants).ThenInclude(cp => cp.Participant).FirstOrDefaultAsync(c => c.Handle == handle);

            if (certificate == null) return null;

            return certificate.ToDto();
        }

        public async Task<bool> DeleteCertificateByHandleAsync(Guid handle)
        {
            var certificate = await _context.Certificates.FirstOrDefaultAsync(c => c.Handle == handle);

            if (certificate == null) return false;

            _context.Certificates.Remove(certificate);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Certificate> CreateCertificateAsync(CertificateCreateDto certificateCreateDto, Supplier supplier, byte[] pdfBytes)
        {
            var certificate = new Certificate
            {
                Handle = Guid.NewGuid(),
                CertificateType = certificateCreateDto.CertificateType,
                ValidFrom = certificateCreateDto.ValidFrom,
                ValidTo = certificateCreateDto.ValidTo,
                Supplier = supplier,
                PdfDocument = pdfBytes,
            };

            _context.Certificates.Add(certificate);
            await _context.SaveChangesAsync();

            return certificate;
        }

    }
}
