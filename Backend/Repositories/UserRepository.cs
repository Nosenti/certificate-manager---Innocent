using Backend.Data;
using Backend.Dtos;
using Backend.Mappers;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly CertificatesDbContext _context;

        public UserRepository(CertificatesDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _context.Users.ToListAsync();
            return users.ToDtoList();
        }

        public async Task<UserDto> GetUserByHandleAsync(Guid handle)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Handle == handle);
            if (user == null) return null;
            return user.ToDto();
        }
    }
}
