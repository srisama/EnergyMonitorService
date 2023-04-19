using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;
using EnergyMonitorServices.BusinessDataAccess;

namespace EnergyMonitorServices.BusinessManager
{
    public class DevicesManager : IDevicesManager
    {
        private IDevicesAccess devicesAccess;
        public DevicesManager(IDevicesAccess devicesAccess)
        {
            this.devicesAccess = devicesAccess;
        }

        public async Task<object> DeleteDevice(Devices devices)
        {
            return await this.devicesAccess.DeleteDevice(devices);
        }

        public async Task<object> GetDeviceByPrimaryId(Devices devices)
        {
            return await this.devicesAccess.GetDeviceByPrimaryId(devices);
        }

        public async Task<IEnumerable<object>> GetDevices(Devices devices)
        {
            return await this.devicesAccess.GetDevices(devices);
        }

        public async Task<object> InsertDevice(Devices devices)
        {
            return await this.devicesAccess.InsertDevice(devices);
        }

        public async Task<object> UpdateDevice(Devices devices)
        {
            return await this.devicesAccess.UpdateDevice(devices);
        }
    }
}