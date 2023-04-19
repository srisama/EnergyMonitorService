using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;
using EnergyMonitorServices.BusinessDataAccess;

namespace EnergyMonitorServices.BusinessManager
{
    public class EnergyUsageSummaryManager : IEnergyUsageSummaryManager
    {
        private IEnergyUsageSummaryAccess energyUsageSummaryAccess;
        public EnergyUsageSummaryManager(IEnergyUsageSummaryAccess energyUsageSummaryAccess)
        {
            this.energyUsageSummaryAccess = energyUsageSummaryAccess;
        }

        public async Task<object> DeleteEnergyUsageSummary(EnergyUsageSummary energyUsageSummary)
        {
            return await this.energyUsageSummaryAccess.DeleteEnergyUsageSummary(energyUsageSummary);
        }

        public async Task<IEnumerable<object>> GetEnergyUsageSummaries(EnergyUsageSummary energyUsageSummary)
        {
            return await this.energyUsageSummaryAccess.GetEnergyUsageSummaries(energyUsageSummary);
        }

        public async Task<object> GetEnergyUsageSummaryByPrimaryId(EnergyUsageSummary energyUsageSummary)
        {
            return await this.energyUsageSummaryAccess.GetEnergyUsageSummaryByPrimaryId(energyUsageSummary);
        }

        public async Task<object> InsertEnergyUsageSummary(EnergyUsageSummary energyUsageSummary)
        {
            return await this.energyUsageSummaryAccess.InsertEnergyUsageSummary(energyUsageSummary);
        }

        public async Task<object> UpdateEnergyUsageSummary(EnergyUsageSummary energyUsageSummary)
        {
            return await this.energyUsageSummaryAccess.UpdateEnergyUsageSummary(energyUsageSummary);
        }
    }
}