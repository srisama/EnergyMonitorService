using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;

namespace EnergyMonitorServices.BusinessDataAccess
{
    public interface IUserPreferenceAccess
    {

        Task<object> GetUserPreferencebyUserId(UserPreference userPreference);

        Task<object> GetUserPreferencebyId(UserPreference userPreference);

        Task<object> UpdateUserPreferenc(UserPreference userPreference);

        Task<object> DeleteUserPreferenc(UserPreference userPreference);

        Task<object> InserUserPreferenc(UserPreference userPreference);
    }
}