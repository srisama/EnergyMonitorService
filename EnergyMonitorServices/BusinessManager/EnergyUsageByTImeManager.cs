using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;
using EnergyMonitorServices.BusinessDataAccess;

namespace EnergyMonitorServices.BusinessManager
{
    public class EnergyUsageByTimeManager : IEnergyUsageByTimeManager
    {
        private IEnergyUsageByTimeAccess energyUsageByTimeAccess;
        public EnergyUsageByTimeManager(IEnergyUsageByTimeAccess energyUsageByTimeAccess)
        {
            this.energyUsageByTimeAccess = energyUsageByTimeAccess;
        }

        public async Task<object> DeleteEnergyUsageByTime(EnergyUsageByTime energyUsageByTime)
        {
            return await this.energyUsageByTimeAccess.DeleteEnergyUsageByTime(energyUsageByTime);
        }

        public async Task<IEnumerable<object>> GetEnergyUsageByTime(EnergyUsageByTime energyUsageByTime)
        {
            return await this.energyUsageByTimeAccess.GetEnergyUsageByTime(energyUsageByTime);
        }

        public async Task<object> GetEnergyUsageByTimeById(EnergyUsageByTime energyUsageByTime)
        {
            return await this.energyUsageByTimeAccess.GetEnergyUsageByTimeById(energyUsageByTime);
        }

        public async Task<object> InsertEnergyUsageByTime(EnergyUsageByTime energyUsageByTime)
        {
            return await this.energyUsageByTimeAccess.InsertEnergyUsageByTime(energyUsageByTime);
        }

        public async Task<object> UpdateEnergyUsageByTime(EnergyUsageByTime energyUsageByTime)
        {
            return await this.energyUsageByTimeAccess.UpdateEnergyUsageByTime(energyUsageByTime);
        }
    }
}