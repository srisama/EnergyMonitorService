using Dapper;
using EnergyMonitorServices.BusinessEntities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyMonitorServices.BusinessDataAccess
{
    public class EnergyUsageByDeviceAccess : IEnergyUsageByDeviceTypeAccess
    {
        private readonly string sqlConnection;

        public EnergyUsageByDeviceAccess(string sqlConnection)
        {
            this.sqlConnection = sqlConnection;
        }

        public async Task<object> DeleteEnergyUsageByDevice(EnergyUsageByDeviceType energyUsageByDevice)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                try
                {
                    var procedure = "[dbo].[usp_delete_energy_usage_summary] @summary_id";
                    var values = new
                    {
                        summary_id = energyUsageByDevice.Usage_Id,
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

        public async Task<IEnumerable<object>> GetEnergyUsageByDevice(EnergyUsageByDeviceType energyUsageByDevice)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = "[dbo].[energy_usage_by_device_type]";
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

        public async Task<object> GetEnergyUsageByDeviceById(EnergyUsageByDeviceType energyUsageByDevice)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                try
                {
                    var procedure = "[dbo].[usp_get_energy_usage_summary_by_id] @summary_id";
                    var values = new
                    {

                        summary_id = energyUsageByDevice.Usage_Id,
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

        public async Task<object> InsertEnergyUsageByDevice(EnergyUsageByDeviceType energyUsageByDevice)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = "[dbo].[usp_add_energy_usage_by_device_type] @device_type,@usage_date,@device_id";
                    var values = new
                    {
                        // adding parameter with name @device_type to the command.
                        device_type = energyUsageByDevice.Usage_Id,
                        // adding parameter with name @usage_date to the command.
                        usage_date = energyUsageByDevice.Usage_Date,
                        // adding parameter with name @total_energy_usage to the command.
                        total_energy_usage = energyUsageByDevice.Total_Energy_Usage,
                        // adding parameter with name @device_id to the command.
                        device_id = energyUsageByDevice.Device_Id,
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

        public async Task<object> UpdateEnergyUsageByDevice(EnergyUsageByDeviceType energyUsageByDevice)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = "[dbo].[usp_add_energy_usage_by_device_type] @device_type,@usage_date,@device_id";
                    var values = new
                    {
                        // adding parameter with name @device_type to the command.
                        device_type = energyUsageByDevice.Usage_Id,
                        // adding parameter with name @usage_date to the command.
                        usage_date = energyUsageByDevice.Usage_Date,
                        // adding parameter with name @total_energy_usage to the command.
                        total_energy_usage = energyUsageByDevice.Total_Energy_Usage,
                        // adding parameter with name @device_id to the command.
                        device_id = energyUsageByDevice.Device_Id,
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