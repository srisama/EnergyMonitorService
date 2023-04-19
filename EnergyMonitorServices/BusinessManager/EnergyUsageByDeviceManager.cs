using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;
using EnergyMonitorServices.BusinessDataAccess;

namespace EnergyMonitorServices.BusinessManager
{
    public class EnergyUsageByDeviceManager : IEnergyUsageByDeviceTypeManager
    {
        private IEnergyUsageByDeviceTypeAccess energyUsageByDeviceType;
        public EnergyUsageByDeviceManager(IEnergyUsageByDeviceTypeAccess energyUsageByDeviceType)
        {
            this.energyUsageByDeviceType = energyUsageByDeviceType;
        }

        public async Task<object> DeleteEnergyUsageByDevice(EnergyUsageByDeviceType energyUsageByDevice)
        {
            return await this.energyUsageByDeviceType.DeleteEnergyUsageByDevice(energyUsageByDevice);
        }

        public async Task<IEnumerable<object>> GetEnergyUsageByDevice(EnergyUsageByDeviceType energyUsageByDevice)
        {
            return await this.energyUsageByDeviceType.GetEnergyUsageByDevice(energyUsageByDevice);
        }

        public async Task<object> GetEnergyUsageByDeviceById(EnergyUsageByDeviceType energyUsageByDevice)
        {
            return await this.energyUsageByDeviceType.GetEnergyUsageByDeviceById(energyUsageByDevice);
        }

        public async Task<object> InsertEnergyUsageByDevice(EnergyUsageByDeviceType energyUsageByDevice)
        {
            return await this.energyUsageByDeviceType.InsertEnergyUsageByDevice(energyUsageByDevice);
        }

        public async Task<object> UpdateEnergyUsageByDevice(EnergyUsageByDeviceType energyUsageByDevice)
        {
            return await this.energyUsageByDeviceType.UpdateEnergyUsageByDevice(energyUsageByDevice);
        }
    }
}