using Backend.Dtos;
using Backend.Entities;

namespace Backend.Mappers
{
    public static class SupplierMapper
    {
        public static SupplierDto ToDto(this Supplier supplier)
        {
            return new SupplierDto
            {
                Handle = supplier.Handle,
                Index = supplier.SupplierIndex,
                Name = supplier.SupplierName,
                City = supplier.City
            };
        }

        public static List<SupplierDto> ToDtoList(this IEnumerable<Supplier> suppliers)
        {
            return suppliers.Select(supplier => supplier.ToDto()).ToList();
        }
    }
}
