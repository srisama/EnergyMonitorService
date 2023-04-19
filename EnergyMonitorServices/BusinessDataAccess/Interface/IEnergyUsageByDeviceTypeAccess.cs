using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;

namespace EnergyMonitorServices.BusinessDataAccess
{
    public interface IEnergyUsageByDeviceTypeAccess
    {
        Task<IEnumerable<object>> GetEnergyUsageByDevice(EnergyUsageByDeviceType energyUsageByDevice);

        Task<object> GetEnergyUsageByDeviceById(EnergyUsageByDeviceType energyUsageByDevice);

        Task<object> UpdateEnergyUsageByDevice(EnergyUsageByDeviceType energyUsageByDevice);

        Task<object> DeleteEnergyUsageByDevice(EnergyUsageByDeviceType energyUsageByDevice);

        Task<object> InsertEnergyUsageByDevice(EnergyUsageByDeviceType energyUsageByDevice);
    }
}