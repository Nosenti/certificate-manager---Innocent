using Backend.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CertificatesController : ControllerBase
    {
        private readonly ICertificateService _certificateService;

        public CertificatesController(ICertificateService certificateService)
        {
            _certificateService = certificateService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CertificateDto>>> GetCertificates()
        {
            var certificates = await _certificateService.GetAllCertificatesAsync();

            var certificatesDto = certificates;

            return Ok(certificatesDto);
        }

        [HttpGet("{handle}")]
        public async Task<ActionResult<CertificateDto>> GetCertificateByHandle(Guid handle)
        {
            var certificate = await _certificateService.GetCertificateByHandleAsync(handle);
            if (certificate == null)
            {
                return NotFound(new { Message = "Certificate not found." });
            }
            return Ok(certificate);
        }

        [HttpDelete("{handle}")]
        public async Task<IActionResult> DeleteCertificate(Guid handle)
        {
            var res = await _certificateService.DeleteCertificateByHandleAsync(handle);

            if (!res) return NotFound(new { Message = "Certificate not found." });

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<CertificateDto>> CreateCertificate([FromForm] CertificateCreateDto certificateCreateDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var newCertificate = await _certificateService.CreateCertificateAsync(certificateCreateDto);
            return CreatedAtAction(nameof(GetCertificateByHandle), new { handle = newCertificate.Handle }, newCertificate);
        }

    }
}
