using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyMonitorServices.BusinessEntities
{
    public class EnergyUsageSummary
    {
        private Int32 summary_id;
        private Int32 device_id;
        private String summary_date;
        private Int32 total_energy_usage;
      

        public EnergyUsageSummary()
        {
        }

        public EnergyUsageSummary(Int32 summary_id, Int32 device_id, String summary_date, Int32 total_energy_usage)
        {
            this.summary_id = summary_id;
            this.device_id = device_id;
            this.summary_date = summary_date;
            this.total_energy_usage = total_energy_usage;
          
        }

        public Int32 Summary_Id
        {
            get { return summary_id; }
            set { summary_id = value; }
        }

        public Int32 Device_Id
        {
            get { return device_id; }
            set { device_id = value; }
        }

        public String Summary_Date
        {
            get { return summary_date; }
            set { summary_date = value; }
        }


        public Int32 Total_Energy_Usage
        {
            get { return total_energy_usage; }
            set { total_energy_usage = value; }
        }

       
    }

}
