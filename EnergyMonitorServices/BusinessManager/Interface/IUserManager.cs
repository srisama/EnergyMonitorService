using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;

namespace EnergyMonitorServices.BusinessManager
{
   public interface IUserManager
    {
        Task<object> ValidateUser(Users users);

        Task<IEnumerable<object>> GetUsers(Users users);

        Task<IEnumerable<object>> GetRoles(Users users);

        Task<object> InsertUser(Users users);

        Task<object> GetUserByPrimaryId(Users users);

        Task<object> UpdateUser(Users users);

        Task<object> DeleteUser(Users users);

    }
}
