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
    }
}
