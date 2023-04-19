using Dapper;
using EnergyMonitorServices.BusinessEntities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyMonitorServices.BusinessDataAccess
{
    public class EnergyUsageByTimeAccess : IEnergyUsageByTimeAccess
    {
        private readonly string sqlConnection;

        public EnergyUsageByTimeAccess(string sqlConnection)
        {
            this.sqlConnection = sqlConnection;
        }

        public async Task<object> DeleteEnergyUsageByTime(EnergyUsageByTime energyUsageByTime)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                try
                {
                    var procedure = "[dbo].[usp_delete_energy_usage_summary] @summary_id";
                    var values = new
                    {
                        summary_id = energyUsageByTime.Time_Id,
                    };
                    var results = await connection.ExecuteScalarAsync<object>(procedure, values);
                    return results;
                }
                catch (Exception ex)
                {
                    throw;
                }
            }
        }

        public async Task<IEnumerable<object>> GetEnergyUsageByTime(EnergyUsageByTime energyUsageByTime)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = "[dbo].[usp_get_energy_usage_summary]";
                    //var values = new
                    //{
                    //    // adding parameter with name @device_id to the command.
                    //    device_id = energyUsageSummary.Device_Id,
                    //};
                    var results = await connection.QueryAsync<object>(procedure, transaction);
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

        public async Task<object> GetEnergyUsageByTimeById(EnergyUsageByTime energyUsageByTime)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                try
                {
                    var procedure = "[dbo].[usp_get_energy_usage_summary_by_id] @summary_id";
                    var values = new
                    {

                        summary_id = energyUsageByTime.Time_Id,
                    };
                    var results = await connection.QueryFirstAsync<object>(procedure, values);
                    return results;
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        public async Task<object> InsertEnergyUsageByTime(EnergyUsageByTime energyUsageByTime)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = "[dbo].[usp_add_energy_usage_summary] @device_id,@summary_date,@total_energy_usage";
                    var values = new
                    {
                        // adding parameter with name @device_id to the command.
                        device_id = energyUsageByTime.Time_Id,
                        // adding parameter with name @summary_date to the command.
                        summary_date = energyUsageByTime.Usage_Date,
                        // adding parameter with name @total_energy_usage to the command.
                        total_energy_usage = energyUsageByTime.Total_Energy_Usage,
                        // adding parameter with name @total_energy_usage to the command.
                        deviceid = energyUsageByTime.Device_Id,
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

        public async Task<object> UpdateEnergyUsageByTime(EnergyUsageByTime energyUsageByTime)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = "[dbo].[usp_add_energy_usage_summary] @device_id,@summary_date,@total_energy_usage";
                    var values = new
                    {
                        // adding parameter with name @device_id to the command.
                        device_id = energyUsageByTime.Time_Id,
                        // adding parameter with name @summary_date to the command.
                        summary_date = energyUsageByTime.Usage_Date,
                        // adding parameter with name @total_energy_usage to the command.
                        total_energy_usage = energyUsageByTime.Total_Energy_Usage,
                        // adding parameter with name @total_energy_usage to the command.
                        deviceid = energyUsageByTime.Device_Id,
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