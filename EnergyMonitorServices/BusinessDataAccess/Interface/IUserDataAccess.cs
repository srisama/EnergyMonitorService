using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;

namespace EnergyMonitorServices.BusinessDataAccess
{
    public interface IUserDataAccess
    {
        Task<object> ValidateUser(Users users);
    }
}
