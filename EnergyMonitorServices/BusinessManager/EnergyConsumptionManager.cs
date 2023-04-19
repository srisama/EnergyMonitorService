using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;
using EnergyMonitorServices.BusinessDataAccess;

namespace EnergyMonitorServices.BusinessManager
{
    public class EnergyConsumptionManager : IEnergyConsumptionManager
    {
        private IEnergyConsumptionAccess energyConsumptionAccess;
        public EnergyConsumptionManager(IEnergyConsumptionAccess energyConsumptionAccess)
        {
            this.energyConsumptionAccess = energyConsumptionAccess;
        }

        public async Task<object> DeleteEnergyConsumption(EnergyConsumption energyConsumption)
        {
            return await this.energyConsumptionAccess.DeleteEnergyConsumption(energyConsumption);
        }

        public async Task<object> GetEnergyConsumptionbyDeviceId(EnergyConsumption energyConsumption)
        {
            return await this.energyConsumptionAccess.GetEnergyConsumptionbyDeviceId(energyConsumption);
        }

        public async Task<object> GetEnergyConsumptionbyDate(EnergyConsumption energyConsumption)
        {
            return await this.energyConsumptionAccess.GetEnergyConsumptionbyDate(energyConsumption);
        }

        public async Task<object> GetEnergyConsumptionbyEnergyId(EnergyConsumption energyConsumption)
        {
            return await this.energyConsumptionAccess.GetEnergyConsumptionbyEnergyId(energyConsumption);
        }

        public async Task<object> InserEnergyConsumption(EnergyConsumption energyConsumption)
        {
            return await this.energyConsumptionAccess.InserEnergyConsumption(energyConsumption);
        }

        public async Task<object> UpdateEnergyConsumption(EnergyConsumption energyConsumption)
        {
            return await this.energyConsumptionAccess.UpdateEnergyConsumption(energyConsumption);
        }
    }
}