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
        private String store_code;
        private String from_date;
        private String to_date;




        public EnergyUsageSummary()
        {
        }

        public EnergyUsageSummary(Int32 summary_id, Int32 device_id, String summary_date, Int32 total_energy_usage,String store_code,String from_date,String to_date)
        {
            this.summary_id = summary_id;
            this.device_id = device_id;
            this.summary_date = summary_date;
            this.total_energy_usage = total_energy_usage;
            this.store_code = store_code;
            this.from_date = from_date;
            this.to_date = to_date;
          
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
        public String From_Date
        {
            get { return from_date; }
            set { from_date = value; }
        }
        public String To_Date
        {
            get { return to_date; }
            set { to_date = value; }
        }
        public String Store_Code
        {
            get { return store_code; }
            set { store_code = value; }
        }

    }

}
