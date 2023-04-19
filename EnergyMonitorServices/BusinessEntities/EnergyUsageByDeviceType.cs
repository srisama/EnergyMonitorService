using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyMonitorServices.BusinessEntities
{
    public class EnergyUsageByDeviceType
    {
        private Int32 usage_id;
        private Int32 device_type;
        private DateTime usage_date;
        private Int32 total_energy_usage;
        private Int32 device_id;


        public EnergyUsageByDeviceType()
        {
        }

        public EnergyUsageByDeviceType(Int32 usage_id, Int32 device_type, DateTime usage_date, Int32 total_energy_usage,Int32 device_id)
        {
            this.usage_id = usage_id;
            this.device_type = device_type;
            this.usage_date = usage_date;
            this.total_energy_usage = total_energy_usage;
            this.device_id = device_id;

        }

        public Int32 Usage_Id
        {
            get { return usage_id; }
            set { usage_id = value; }
        }

        public Int32 Device_Type
        {
            get { return device_type; }
            set { device_type = value; }
        }

        public DateTime Usage_Date
        {
            get { return usage_date; }
            set { usage_date = value; }
        }


        public Int32 Total_Energy_Usage
        {
            get { return total_energy_usage; }
            set { total_energy_usage = value; }
        }
        public Int32 Device_Id
        {
            get { return device_id; }
            set { device_id = value; }
        }

    }

}
