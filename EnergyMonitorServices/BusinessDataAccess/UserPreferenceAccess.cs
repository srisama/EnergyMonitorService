using Dapper;
using EnergyMonitorServices.BusinessEntities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyMonitorServices.BusinessDataAccess
{
    public class UserPreferenceAccess : IUserPreferenceAccess
    {
        private readonly string sqlConnection;

        public UserPreferenceAccess(string sqlConnection)
        {
            this.sqlConnection = sqlConnection;
        }

        public async Task<object> DeleteUserPreferenc(UserPreference userPreference)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = " [dbo].[usp_delete_user_preference] @preference_id";
                    var values = new
                    {
                        // adding parameter with name @preference_id to the command.
                        preference_id = userPreference.Preference_Id,
                    };
                    var results = await connection.ExecuteScalarAsync<object>(procedure, values, transaction);
                    transaction.Commit();
                    return results;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }

        public async Task<object> GetUserPreferencebyId(UserPreference userPreference)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = " [dbo].[usp_get_user_preference] @preference_id";
                    var values = new
                    {
                        // adding parameter with name @energy_id to the command.
                        preference_id = userPreference.Preference_Id,
                    };
                    var results = await connection.QueryFirstAsync<object>(procedure, values, transaction);
                    transaction.Commit();
                    return results;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }

        public async Task<object> GetUserPreferencebyUserId(UserPreference userPreference)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = "[dbo].[usp_get_user_preferences_by_userid] @userid";
                    var values = new
                    {
                        // adding parameter with name @userid to the command.
                        userid = userPreference.User_Id,
                    };
                    var results = await connection.QueryAsync<object>(procedure, values, transaction);
                    transaction.Commit();
                    return results;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }

        public async Task<object> InserUserPreferenc(UserPreference userPreference)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = "[dbo].[usp_add_user_preference] @user_id,@energy_usage_goal,@energy_alert_threshold,@report_frequency,@device_id";
                    var values = new
                    {
                        // adding parameter with name @user_id to the command.
                        user_id = userPreference.User_Id,
                        // adding parameter with name @energy_usage_goal to the command.
                        energy_usage_goal = userPreference.Energy_Usage_Goal,
                        // adding parameter with name energy_alert_threshold to the command.
                        energy_alert_threshold = userPreference.Energy_Alert_Threshold,
                        // adding parameter with name report_frequency to the command.
                        report_frequency = userPreference.Report_Frequency,
                        // adding parameter with name @device_id to the command.
                        device_id = userPreference.Device_Id,
                    };
                    var results = await connection.ExecuteScalarAsync<object>(procedure, values, transaction);
                    transaction.Commit();
                    return results;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }

        public async Task<object> UpdateUserPreferenc(UserPreference userPreference)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = "[dbo].[usp_update_user_preference] @user_id,@energy_usage_goal,@energy_alert_threshold,@report_frequency,@device_id";
                    var values = new
                    {
                        // adding parameter with name @user_id to the command.
                        user_id = userPreference.User_Id,
                        // adding parameter with name @energy_usage_goal to the command.
                        energy_usage_goal = userPreference.Energy_Usage_Goal,
                        // adding parameter with name energy_alert_threshold to the command.
                        energy_alert_threshold = userPreference.Energy_Alert_Threshold,
                        // adding parameter with name report_frequency to the command.
                        report_frequency = userPreference.Report_Frequency,
                        // adding parameter with name @device_id to the command.
                        device_id = userPreference.Device_Id,
                    };
                    var results = await connection.ExecuteScalarAsync<object>(procedure, values, transaction);
                    transaction.Commit();
                    return results;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }
    }
}