using Dapper;
using EnergyMonitorServices.BusinessEntities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyMonitorServices.BusinessDataAccess
{
    public class EnergyConsumptionAccess : IEnergyConsumptionAccess
    {
        private readonly string sqlConnection;

        public EnergyConsumptionAccess(string sqlConnection)
        {
            this.sqlConnection = sqlConnection;
        }

        public async Task<object> DeleteEnergyConsumption(EnergyConsumption energyConsumption)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = " [dbo].[usp_delete_energy_consumption] @energy_id";
                    var values = new
                    {
                        // adding parameter with name @energy_id to the command.
                        energy_id = energyConsumption.Energy_Id,
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

        public async Task<object> GetEnergyConsumptionbyDeviceId(EnergyConsumption energyConsumption)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = "[dbo].[usp_get_energy_usage_Hourly_Graph] @device_id,@date,@storecode";
                    var values = new
                    {
                        // adding parameter with name @device_id to the command.
                        device_id = energyConsumption.Device_Id,
                        date = energyConsumption.Measurement_Date,
                        storecode = energyConsumption.Store_Code
                    };
                    //var procedure = " [dbo].[usp_get_energy_consumption_by_device] @device_id";
                    //var values = new
                    //{
                    //    // adding parameter with name @device_id to the command.
                    //    device_id = energyConsumption.Device_Id,
                    //};
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

        public async Task<object> GetEnergyConsumptionbyDate(EnergyConsumption energyConsumption)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = "[dbo].[usp_get_energy_usage_Hourly_Graph] @device_id,@date,@storecode";
                    var values = new
                    {
                        // adding parameter with name @device_id to the command.
                        device_id = energyConsumption.Device_Id,
                        date = energyConsumption.Measurement_Date,
                        storecode=energyConsumption.Store_Code
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

        public async Task<object> GetEnergyConsumptionbyEnergyId(EnergyConsumption energyConsumption)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = " [dbo].[usp_get_energy_consumption_by_id] @energy_id";
                    var values = new
                    {
                        // adding parameter with name @energy_id to the command.
                        energy_id = energyConsumption.Energy_Id,
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

        public async Task<object> InserEnergyConsumption(EnergyConsumption energyConsumption)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = "[dbo].[usp_add_energy_consumption] @device_id,@energy_consumption,@measurement_date,@measurement_hour,@store_code";
                    var values = new
                    {
                        // adding parameter with name @device_id to the command.
                        device_id = energyConsumption.Device_Id,
                        // adding parameter with name @energy_consumption to the command.
                        energy_consumption = energyConsumption.Energy_Consumption,
                        // adding parameter with name @measurement_time to the command.
                        measurement_date = energyConsumption.Measurement_Date,
                        // adding parameter with name @measurement_hour to the command.
                        measurement_hour = energyConsumption.Measurement_Hour,
                        // adding parameter with name @store_code to the command.
                        store_code = energyConsumption.Store_Code,
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

        public async Task<object> UpdateEnergyConsumption(EnergyConsumption energyConsumption)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = " [dbo].[usp_update_energy_consumption] @energy_id,@energy_consumption,@measurement_date,@measurement_hour,@store_code";
                    var values = new
                    {
                        // adding parameter with name @@energy_id to the command.
                        energy_id = energyConsumption.Energy_Id,
                        // adding parameter with name @energy_consumption to the command.
                        energy_consumption = energyConsumption.Energy_Consumption,
                        // adding parameter with name @measurement_date to the command.
                        measurement_date = energyConsumption.Measurement_Date,
                        // adding parameter with name @measurement_hour to the command.
                        measurement_hour = energyConsumption.Measurement_Hour,
                        // adding parameter with name @store_code to the command.
                        store_code = energyConsumption.Store_Code
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
