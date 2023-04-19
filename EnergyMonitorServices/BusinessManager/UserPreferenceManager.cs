using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;
using EnergyMonitorServices.BusinessDataAccess;

namespace EnergyMonitorServices.BusinessManager
{
    public class UserPreferenceManager : IUserPreferenceManager
    {
        private IUserPreferenceAccess userPreferenceAccess;
        public UserPreferenceManager(IUserPreferenceAccess userPreferenceAccess)
        {
            this.userPreferenceAccess = userPreferenceAccess;
        }

        public async Task<object> DeleteUserPreferenc(UserPreference userPreference)
        {
            return await this.userPreferenceAccess.DeleteUserPreferenc(userPreference);
        }

        public async Task<object> GetUserPreferencebyId(UserPreference userPreference)
        {
            return await this.userPreferenceAccess.GetUserPreferencebyId(userPreference);
        }

        public async Task<object> GetUserPreferencebyUserId(UserPreference userPreference)
        {
            return await this.userPreferenceAccess.GetUserPreferencebyUserId(userPreference);
        }

        public async Task<object> InserUserPreferenc(UserPreference userPreference)
        {
            return await this.userPreferenceAccess.InserUserPreferenc(userPreference);
        }

        public async Task<object> UpdateUserPreferenc(UserPreference userPreference)
        {
            return await this.userPreferenceAccess.UpdateUserPreferenc(userPreference);
        }
    }
}