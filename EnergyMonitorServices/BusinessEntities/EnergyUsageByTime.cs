using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyMonitorServices.BusinessEntities
{
    public class EnergyUsageByTime
    {
        private Int32 time_id;
        private DateTime usage_date;
        private Int32 total_energy_usage;
        private Int32 device_id;


        public EnergyUsageByTime()
        {
        }

        public EnergyUsageByTime(Int32 time_id, DateTime usage_date, Int32 total_energy_usage, Int32 device_id)
        {
            this.time_id = time_id;
            this.usage_date = usage_date;
            this.total_energy_usage = total_energy_usage;
            this.device_id = device_id;

        }

        public Int32 Time_Id
        {
            get { return time_id; }
            set { time_id = value; }
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
