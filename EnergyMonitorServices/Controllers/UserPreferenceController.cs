using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;
using EnergyMonitorServices.BusinessDataAccess;
using EnergyMonitorServices.BusinessManager;
using EnergyMonitorServices.Response;
using System.Net;

namespace EnergyMonitorServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserPreferenceController : ControllerBase
    {
        private IUserPreferenceManager userPreferenceManager;
        public UserPreferenceController(IUserPreferenceManager userPreferenceManager)
        {
            this.userPreferenceManager = userPreferenceManager;
        }

        /// <summary>
        /// This is api function to get all the record from the table UserPreference
        /// </summary>
        /// <param name="userPreference">UserPreference</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("GetUserPreferences")]
        public async Task<HttpApiResponse> GetUserPreferences(UserPreference userPreference)
        {
            var result = await this.userPreferenceManager.GetUserPreferencebyUserId(userPreference);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// This is api function to get all the record from the table userPreference
        /// </summary>
        /// <param name="userPreference">UserPreference</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("GetUserPreferencebyId")]
        public async Task<HttpApiResponse> GetUserPreferencebyId(UserPreference userPreference)
        {
            var result = await this.userPreferenceManager.GetUserPreferencebyId(userPreference);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// This is api function is to insert row to the table EnergyConsumption
        /// </summary>
        /// <param name="EnergyConsumption">EnergyConsumption</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("AddUserPreference")]
        public async Task<HttpApiResponse> AddUserPreference(UserPreference userPreference)
        {
            try
            {
                var result = await this.userPreferenceManager.InserUserPreferenc(userPreference);
                return new HttpApiResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return new HttpApiResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        /// <summary>
        /// This is api function is to insert row to the table UserPreference
        /// </summary>
        /// <param name="UserPreference">UserPreference</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPut]
        [Route("UpdateUserPreference")]
        public async Task<HttpApiResponse> UpdateUserPreference(UserPreference userPreference)
        {
            try
            {
                var result = await this.userPreferenceManager.UpdateUserPreferenc(userPreference);
                return new HttpApiResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return new HttpApiResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        /// <summary>
        /// This is api function to delete the row from the table Devices by primary Key of the table
        /// </summary>
        /// <param name="UserPreference">UserPreference</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("DeleteUserPreference")]
        public async Task<HttpApiResponse> DeleteUserPreference(UserPreference userPreference)
        {
            var result = await this.userPreferenceManager.DeleteUserPreferenc(userPreference);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }
    }
}
