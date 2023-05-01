using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;

namespace EnergyMonitorServices.BusinessDataAccess
{
    public interface IEnergyUsageSummaryAccess
    {
        Task<IEnumerable<object>> GetEnergyUsageSummaries(EnergyUsageSummary energyUsageSummary);

        Task<object> GetEnergyUsageSummaryByPrimaryId(EnergyUsageSummary energyUsageSummary);

        Task<object> UpdateEnergyUsageSummary(EnergyUsageSummary energyUsageSummary);

        Task<object> DeleteEnergyUsageSummary(EnergyUsageSummary energyUsageSummary);

        Task<object> InsertEnergyUsageSummary(EnergyUsageSummary energyUsageSummary);

        Task<object> EnergyUsagebyTwoDates(EnergyUsageSummary energyUsageSummary);

    }
}