using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;

namespace EnergyMonitorServices.BusinessDataAccess
{
    public interface IEnergyConsumptionManager
    {

        Task<object> GetEnergyConsumptionbyDeviceId(EnergyConsumption energyConsumption);

        Task<object> GetEnergyConsumptionbyEnergyId(EnergyConsumption energyConsumption);

        Task<object> UpdateEnergyConsumption(EnergyConsumption energyConsumption);

        Task<object> DeleteEnergyConsumption(EnergyConsumption energyConsumption);

        Task<object> InserEnergyConsumption(EnergyConsumption energyConsumption);

        Task<object> GetEnergyConsumptionbyDate(EnergyConsumption energyConsumption);
    }
}