using Dapper;
using EnergyMonitorServices.BusinessEntities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyMonitorServices.BusinessDataAccess
{
    public class DevicesAccess : IDevicesAccess
    {
        private readonly string sqlConnection;

        public DevicesAccess(string sqlConnection)
        {
            this.sqlConnection = sqlConnection;
        }

        public async Task<object> DeleteDevice(Devices devices)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                try
                {
                    var procedure = "[dbo].[usp_delete_device] @device_id";
                    var values = new
                    {
                        device_id = devices.Device_Id,
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

        public async Task<object> GetDeviceByPrimaryId(Devices devices)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                try
                {
                    var procedure = "[dbo].[usp_get_device_by_id] @device_id";
                    var values = new
                    {

                        device_id = devices.Device_Id,
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

        public async Task<IEnumerable<object>> GetDevices(Devices devices)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                try
                {
                    var procedure = "[dbo].[usp_get_devices]";
                   
                    var results = await connection.QueryAsync<object>(procedure);
                    return results;
                }
                catch (Exception ex)
                {

                    throw;
                }
            }
        }

        public async Task<object> InsertDevice(Devices devices)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = "[dbo].[usp_create_device] @device_name,@device_type,@power_consumption";
                    var values = new
                    {
                        // adding parameter with name @device_name to the command.
                        device_name = devices.Device_Name,
                        // adding parameter with name @device_type to the command.
                        device_type = devices.Device_Type,
                        // adding parameter with name @power_consumption to the command.
                        power_consumption = devices.Power_Consumption,
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

        public async Task<object> UpdateDevice(Devices devices)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = "[dbo].[usp_update_device] @device_id,@device_name,@device_type,@power_consumption";
                    var values = new
                    {
                        // adding parameter with name @device_id to the command.
                        device_id = devices.Device_Id,
                        // adding parameter with name @device_name to the command.
                        device_name = devices.Device_Name,
                        // adding parameter with name @device_type to the command.
                        device_type = devices.Device_Type,
                        // adding parameter with name @power_consumption to the command.
                        power_consumption = devices.Power_Consumption,
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
