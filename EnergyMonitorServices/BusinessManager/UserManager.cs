using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;
using EnergyMonitorServices.BusinessDataAccess;

namespace EnergyMonitorServices.BusinessManager
{
    public class UserManager : IUserManager
    {
        private IUserDataAccess userDataAccess;
      public UserManager(IUserDataAccess userDataAccess)
        {
            this.userDataAccess = userDataAccess;
        }

        public async Task<object> DeleteUser(Users users)
        {
            return await this.userDataAccess.DeleteUser(users);
        }

        public async Task<IEnumerable<object>> GetRoles(Users users)
        {
            return await this.userDataAccess.GetRoles(users);
        }

        public async Task<object> GetUserByPrimaryId(Users users)
        {
            return await this.userDataAccess.GetUserByPrimaryId(users);
        }

        public async Task<IEnumerable<object>> GetUsers(Users users)
        {
            return await this.userDataAccess.GetUsers(users);
        }

        public async Task<object> InsertUser(Users users)
        {
            return await this.userDataAccess.InsertUser(users);
        }

        public async Task<object> UpdateUser(Users users)
        {
            return await this.userDataAccess.UpdateUser(users);
        }

        public async Task<object> ValidateUser(Users users)
        {
            return await this.userDataAccess.ValidateUser(users);
        }
    }
}
