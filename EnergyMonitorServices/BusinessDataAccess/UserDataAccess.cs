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
