using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;

namespace EnergyMonitorServices.BusinessDataAccess
{
    public interface IEnergyUsageByTimeAccess
    {
        Task<IEnumerable<object>> GetEnergyUsageByTime(EnergyUsageByTime energyUsageByTime);

        Task<object> GetEnergyUsageByTimeById(EnergyUsageByTime energyUsageByTime);

        Task<object> UpdateEnergyUsageByTime(EnergyUsageByTime energyUsageByTime);

        Task<object> DeleteEnergyUsageByTime(EnergyUsageByTime energyUsageByTime);

        Task<object> InsertEnergyUsageByTime(EnergyUsageByTime energyUsageByTime);
    }
}