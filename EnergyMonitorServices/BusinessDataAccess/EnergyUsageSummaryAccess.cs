using Dapper;
using EnergyMonitorServices.BusinessEntities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyMonitorServices.BusinessDataAccess
{
    public class EnergyUsageSummaryAccess : IEnergyUsageSummaryAccess
    {
        private readonly string sqlConnection;

        public EnergyUsageSummaryAccess(string sqlConnection)
        {
            this.sqlConnection = sqlConnection;
        }

        public async Task<object> DeleteEnergyUsageSummary(EnergyUsageSummary energyUsageSummary)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                try
                {
                    var procedure = "[dbo].[usp_delete_energy_usage_summary] @summary_id";
                    var values = new
                    {
                        summary_id = energyUsageSummary.Summary_Id,
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

        public async Task<IEnumerable<object>> GetEnergyUsageSummaries(EnergyUsageSummary energyUsageSummary)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                
                try
                {
                    var procedure = "[dbo].[usp_get_energy_usage_summary]";
                    //var values = new
                    //{
                    //    // adding parameter with name @device_id to the command.
                    //    device_id = energyUsageSummary.Device_Id,
                    //};
                    var results = await connection.QueryAsync<object>(procedure);
                    return results;
                }
                catch (Exception ex)
                {
                    throw;
                }
            }
        }

        public async Task<object> GetEnergyUsageSummaryByPrimaryId(EnergyUsageSummary energyUsageSummary)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                try
                {
                    var procedure = "[dbo].[usp_get_energy_usage_summary_by_id] @summary_id";
                    var values = new
                    {

                        summary_id = energyUsageSummary.Summary_Id,
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

        public async Task<object> InsertEnergyUsageSummary(EnergyUsageSummary energyUsageSummary)
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
                        device_id = energyUsageSummary.Device_Id,
                        // adding parameter with name @summary_date to the command.
                        summary_date = energyUsageSummary.Summary_Date,
                        // adding parameter with name @total_energy_usage to the command.
                        total_energy_usage = energyUsageSummary.Total_Energy_Usage,
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

        public async Task<object> UpdateEnergyUsageSummary(EnergyUsageSummary energyUsageSummary)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = " [dbo].[usp_update_energy_usage_summary] @summary_id,@device_id,@summary_date,@total_energy_usage";
                    var values = new
                    {
                        // adding parameter with name @summary_id to the command.
                        summary_id = energyUsageSummary.Summary_Id,
                        // adding parameter with name @device_id to the command.
                        device_id = energyUsageSummary.Device_Id,
                        // adding parameter with name @summary_date to the command.
                        summary_date = energyUsageSummary.Summary_Date,
                        // adding parameter with name @total_energy_usage to the command.
                        total_energy_usage = energyUsageSummary.Total_Energy_Usage,
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