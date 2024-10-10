using Backend.Dtos;

namespace Backend.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
    }
}
