using Backend.Dtos;
using Backend.Mappers;
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

            var certificatesDto = certificates.ToCertificateDtoList();

            return Ok(certificatesDto);
        }

    }
}
