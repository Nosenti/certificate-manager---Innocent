using Backend.Dtos;

namespace Backend.Services
{
    public interface ISupplierService
    {
        Task<IEnumerable<SupplierDto>> SearchSuppliersAsync(string? name, string? index, string? city);
    }
}
