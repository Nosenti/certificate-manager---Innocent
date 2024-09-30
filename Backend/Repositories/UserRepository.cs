using Backend.Data;
using Backend.Entities;
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

        public async Task<User> GetUserByHandleAsync(Guid handle)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Handle == handle);
        }
    }
}
