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
        public async Task<object> ValidateUser(Users users)
        {
            return await this.userDataAccess.ValidateUser(users);
        }
    }
}
