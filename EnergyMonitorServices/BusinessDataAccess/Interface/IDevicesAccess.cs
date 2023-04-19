using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;

namespace EnergyMonitorServices.BusinessDataAccess
{
    public interface IDevicesAccess
    {
        Task<IEnumerable<object>> GetDevices(Devices devices);

        Task<object> GetDeviceByPrimaryId(Devices devices);

        Task<object> UpdateDevice(Devices devices);

        Task<object> DeleteDevice(Devices devices);

        Task<object> InsertDevice(Devices devices);
    }
}
