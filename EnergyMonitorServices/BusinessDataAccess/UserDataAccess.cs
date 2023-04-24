using Dapper;
using EnergyMonitorServices.BusinessEntities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyMonitorServices.BusinessDataAccess
{
    public class UserDataAccess : IUserDataAccess
    {
        private readonly string sqlConnection;

        public UserDataAccess(string sqlConnection)
        {
            this.sqlConnection = sqlConnection;
        }

        public async Task<object> DeleteUser(Users users)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                try
                {
                    var procedure = "[dbo].[usp_delete_user] @user_id";
                    var values = new
                    {
                        user_id = users.UserId,
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

        public async Task<IEnumerable<object>> GetRoles(Users users)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                try
                {
                    var procedure = "[dbo].[usp_get_roles]";

                    var results = await connection.QueryAsync<object>(procedure);
                    return results;
                }
                catch (Exception ex)
                {

                    throw;
                }
            }
        }

        public async Task<object> GetUserByPrimaryId(Users users)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                try
                {
                    var procedure = "[dbo].[usp_get_user_by_id] @user_id";
                    var values = new
                    {

                        user_id = users.UserId,
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

        public async Task<IEnumerable<object>> GetUsers(Users users)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                try
                {
                    var procedure = "[dbo].[usp_get_users]";

                    var results = await connection.QueryAsync<object>(procedure);
                    return results;
                }
                catch (Exception ex)
                {

                    throw;
                }
            }
        }

        public async Task<object> InsertUser(Users users)
        {
                using (var connection = new SqlConnection(sqlConnection))
                {
                    await connection.OpenAsync();
                    var transaction = connection.BeginTransaction();
                    try
                    {
                        var procedure = "[dbo].[usp_create_user] @username,@email,@password,@role_id";
                        var values = new
                        {
                            // adding parameter with name @device_name to the command.
                            username = users.UserName,
                            // adding parameter with name @device_type to the command.
                            email = users.Email,
                            // adding parameter with name @power_consumption to the command.
                            password = users.Password,
                            // adding parameter with name @power_consumption to the command.
                            role_id = users.RoleId,
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

        public async Task<object> UpdateUser(Users users)
        {
            using (var connection = new SqlConnection(sqlConnection))
            {
                await connection.OpenAsync();
                var transaction = connection.BeginTransaction();
                try
                {
                    var procedure = "[dbo].[usp_update_user] @user_id,@username,@password,@email,@role_id";
                    var values = new
                    {
                        // adding parameter with name @device_name to the command.
                        user_id = users.UserId,
                        // adding parameter with name @device_name to the command.
                        username = users.UserName,
                        // adding parameter with name @power_consumption to the command.
                        password = users.Password,
                        // adding parameter with name @device_type to the command.
                        email = users.Email,
                        // adding parameter with name @power_consumption to the command.
                        role_id = users.RoleId,
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

        public async Task<object> ValidateUser(Users users)
        {
            using (var connection=new SqlConnection(sqlConnection))
            {
                try
                {
                    var procedure = "[dbo].[usp_validate_user_login] @username,@password";
                    var values = new
                    {
                        
                        username = users.UserName,
                        password = users.Password,
                    };
                    var results = await connection.QueryFirstAsync<object>(procedure, values);
                    return results;
                }
                catch (Exception ex)
                {

                    throw;
                }
            }
        }
    }
}
