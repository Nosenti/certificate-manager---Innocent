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
            var certificates = await _context.Certificates.Include(c => c.Supplier).Include(c => c.CertificateParticipants).Include(c => c.Comments).ToListAsync();
            return certificates.ToDtoList();
        }

        public async Task<CertificateDto> GetCertificateByHandleAsync(Guid handle)
        {
            var certificate = await _context.Certificates.Include(c => c.Supplier).Include(c => c.CertificateParticipants).ThenInclude(cp => cp.Participant).FirstOrDefaultAsync(c => c.Handle == handle);

            if (certificate == null) return null;

            Console.WriteLine($"Retrieved Certificate: Id = {certificate.Id}, Handle = {certificate.Handle}");

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

        public async Task<CertificateDto> CreateCertificateAsync(CertificateCreateDto certificateCreateDto, SupplierDto supplierDto, List<ParticipantDto> participantDtos, byte[] pdfBytes)
        {
            var existingSupplier = await _context.Suppliers.FirstOrDefaultAsync(s => s.Handle == supplierDto.Handle);
            if (existingSupplier == null)
            {
                throw new KeyNotFoundException("Supplier not found.");
            }
            var certificate = new Certificate
            {
                Handle = Guid.NewGuid(),
                Type = certificateCreateDto.Type,
                ValidFrom = certificateCreateDto.ValidFrom,
                ValidTo = certificateCreateDto.ValidTo,
                Supplier = existingSupplier,
                PdfDocument = pdfBytes,

            };

            var existingParticipants = new List<Participant>();
            foreach (var participantDto in participantDtos)
            {
                var existingParticipant = await _context.Participants.FirstOrDefaultAsync(p => p.Handle == participantDto.Handle);
                if (existingParticipant != null)
                {
                    existingParticipants.Add(existingParticipant);
                }
                else
                {
                    throw new KeyNotFoundException($"Participant with Handle {participantDto.Handle} not found.");
                }
            }

            certificate.CertificateParticipants = existingParticipants.Select(p => new CertificateParticipant
            {
                Participant = p,
                AssignedDate = DateOnly.FromDateTime(DateTime.UtcNow)
            }).ToList();

            _context.Certificates.Add(certificate);
            await _context.SaveChangesAsync();

            return certificate.ToDto();
        }

        public async Task<CertificateDto> UpdateCertificateAsync(CertificateEditDto certificateEditDto, SupplierDto supplierDto, List<ParticipantDto> participantDtos, byte[]? pdfBytes)
        {
            var certificate = await _context.Certificates
                .Include(c => c.CertificateParticipants)
                .FirstOrDefaultAsync(c => c.Handle == certificateEditDto.Handle);

            if (certificate == null) throw new KeyNotFoundException("Certificate not found");

            certificate.Type = certificateEditDto.Type;
            certificate.ValidFrom = certificateEditDto.ValidFrom;
            certificate.ValidTo = certificateEditDto.ValidTo;

            var existingSupplier = await _context.Suppliers.FirstOrDefaultAsync(s => s.Handle == supplierDto.Handle);
            if (existingSupplier == null)
            {
                throw new KeyNotFoundException("Supplier not found.");
            }
            certificate.Supplier = existingSupplier;

            if (pdfBytes != null)
            {
                certificate.PdfDocument = pdfBytes;
            }

            certificate.CertificateParticipants.Clear();
            var existingParticipants = new List<Participant>();
            foreach (var participantDto in participantDtos)
            {
                var existingParticipant = await _context.Participants.FirstOrDefaultAsync(p => p.Handle == participantDto.Handle);
                if (existingParticipant != null)
                {
                    existingParticipants.Add(existingParticipant);
                }
                else
                {
                    throw new KeyNotFoundException($"Participant with handle {participantDto.Handle} not found.");
                }
            }

            certificate.CertificateParticipants = existingParticipants.Select(p => new CertificateParticipant
            {
                Participant = p,
                AssignedDate = DateOnly.FromDateTime(DateTime.UtcNow)
            }).ToList();

            _context.Certificates.Update(certificate);
            await _context.SaveChangesAsync();

            return certificate.ToDto();
        }
    }
}
