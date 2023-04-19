using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyMonitorServices.BusinessEntities
{
    public class Devices
    {
        private Int32 device_id;
        private String device_name;
        private String device_type;
        private Int32 power_consumption;
        private Int32 device_id_ddl;
        private String device_name_ddl;

        public Devices()
        {
        }

        public Devices(Int32 device_id, String device_name, String device_type, Int32 power_consumption,Int32 device_id_ddl,String device_name_ddl)
        {
            this.device_id = device_id;
            this.device_name = device_name;
            this.device_type = device_type;
            this.power_consumption = power_consumption;
            this.device_id_ddl = device_id_ddl;
            this.device_name_ddl = device_name_ddl;
        }

        public Int32 Device_Id
        {
            get { return device_id; }
            set { device_id = value; }
        }

        public String Device_Name
        {
            get { return device_name; }
            set { device_name = value; }
        }

        public String Device_Type
        {
            get { return device_type; }
            set { device_type = value; }
        }


        public Int32 Power_Consumption
        {
            get { return power_consumption; }
            set { power_consumption = value; }
        }

        public Int32 Device_Id_DDL
        {
            get { return device_id_ddl; }
            set { device_id_ddl = value; }
        }

        public String Device_Name_DDL
        {
            get { return device_name_ddl; }
            set { device_name_ddl = value; }
        }
    }

}
