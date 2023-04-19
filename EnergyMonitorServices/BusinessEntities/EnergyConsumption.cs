using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyMonitorServices.BusinessEntities
{
    public class EnergyConsumption
    {
        private Int32 energy_id;
        private Int32 device_id;
        private Int32 energy_consumption;
        private String measurement_date;
        private Int32 measurement_hour;

        public EnergyConsumption()
        {
        }

        public EnergyConsumption(Int32 energy_id, Int32 device_id, Int32 energy_consumption, String measurement_date,Int32 measurement_hour)
        {
            this.energy_id = energy_id;
            this.device_id = device_id;
            this.energy_consumption = energy_consumption;
            this.measurement_date = measurement_date;
            this.measurement_hour = measurement_hour;
        }

        public Int32 Energy_Id
        {
            get { return energy_id; }
            set { energy_id = value; }
        }
        public Int32 Device_Id
        {
            get { return device_id; }
            set { device_id = value; }
        }
        public Int32 Energy_Consumption
        {
            get { return energy_consumption; }
            set { energy_consumption = value; }
        }

        public String Measurement_Date
        {
            get { return measurement_date; }
            set { measurement_date = value; }
        }
        public Int32 Measurement_Hour
        {
            get { return measurement_hour; }
            set { measurement_hour = value; }
        }
    }

}
