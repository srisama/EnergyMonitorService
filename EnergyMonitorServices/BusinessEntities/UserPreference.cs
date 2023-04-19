using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyMonitorServices.BusinessEntities
{
    public class UserPreference
    {
        private Int32 preference_id;
        private Int32 user_id;
        private Int32 energy_usage_goal;
        private Int32 energy_alert_threshold;
        private String report_frequency;
        private Int32 device_id;

        public UserPreference()
        {
        }

        public UserPreference(Int32 preference_id, Int32 user_id, Int32 energy_usage_goal, Int32 energy_alert_threshold, String report_frequency, Int32 device_id)
        {
            this.preference_id = preference_id;
            this.user_id = user_id;
            this.energy_usage_goal = energy_usage_goal;
            this.energy_alert_threshold = energy_alert_threshold;
            this.report_frequency = report_frequency;
            this.device_id = device_id;
        }

        public Int32 Preference_Id
        {
            get { return preference_id; }
            set { preference_id = value; }
        }

        public Int32 User_Id
        {
            get { return user_id; }
            set { user_id = value; }
        }

        public Int32 Energy_Usage_Goal
        {
            get { return energy_usage_goal; }
            set { energy_usage_goal = value; }
        }


        public Int32 Energy_Alert_Threshold
        {
            get { return energy_alert_threshold; }
            set { energy_alert_threshold = value; }
        }

        public String Report_Frequency
        {
            get { return report_frequency; }
            set { report_frequency = value; }
        }

        public Int32 Device_Id
        {
            get { return device_id; }
            set { device_id = value; }
        }
    }

}
