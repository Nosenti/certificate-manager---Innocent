using Backend.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SuppliersController : ControllerBase
    {
        private readonly ISupplierService _supplierService;

        public SuppliersController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupplierDto>>> SearchSuppliers([FromQuery] string? name, [FromQuery] string? index, [FromQuery] string? city)
        {
            var suppliers = await _supplierService.SearchSuppliersAsync(name, index, city);
            return Ok(suppliers);
        }
    }
}
