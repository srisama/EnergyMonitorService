using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessEntities;
using EnergyMonitorServices.BusinessManager;
using EnergyMonitorServices.Response;
using System.Net;

namespace EnergyMonitorServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserManager userManager;
        public UsersController(IUserManager userManager)
        {
            this.userManager = userManager;
        }

        [HttpPost]
        [Route("ValidateUser")]
        public async Task<HttpApiResponse> ValidateUser(Users users)
        {
            try
            {
                var result = await this.userManager.ValidateUser(users);
                return new HttpApiResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return new HttpApiResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        /// <summary>
        /// This is api function to get all the record from the table Devices
        /// </summary>
        /// <param name="Devices">Devices</param>
        /// <returns>HttpApiResponse</returns>
        [HttpGet]
        [Route("GetRoles")]
        public async Task<HttpApiResponse> GetRoles()
        {
            Users users = new Users();
            var result = await this.userManager.GetRoles(users);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// This is api function to get all the record from the table Devices
        /// </summary>
        /// <param name="Devices">Devices</param>
        /// <returns>HttpApiResponse</returns>
        [HttpGet]
        [Route("GetUsers")]
        public async Task<HttpApiResponse> GetUsers()
        {
            Users users = new Users();
            var result = await this.userManager.GetUsers(users);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }
        /// <summary>
        /// This is api function is to update row to the table cities
        /// </summary>
        /// <param name="cities">cities</param>
        /// <returns>HttpApiResponse</returns>

        [HttpPost]
        [Route("GetUserbyId")]
        public async Task<HttpApiResponse> GetUserbyId(Users users)
        {
            var result = await this.userManager.GetUserByPrimaryId(users);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// This is api function to delete the row from the table Devices by primary Key of the table
        /// </summary>
        /// <param name="NVarChar">deviceid</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("DeleteUser")]
        public async Task<HttpApiResponse> DeleteUser(Users users)
        {

            var result = await this.userManager.DeleteUser(users);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }
        /// <summary>
        /// This is api function is to insert row to the table Devices
        /// </summary>
        /// <param name="devices">Devices</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("AddUser")]
        public async Task<HttpApiResponse> AddUser(Users users)
        {
            try
            {

                var result = await this.userManager.InsertUser(users);
                return new HttpApiResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return new HttpApiResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        /// <summary>
        /// This is api function is to update row to the table cities
        /// </summary>
        /// <param name="cities">cities</param>
        /// <returns>HttpApiResponse</returns>

        [HttpPut]
        [Route("UpdateUser")]
        public async Task<HttpApiResponse> UpdateUser(Users users)
        {
            var result = await this.userManager.UpdateUser(users);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }
    }
}
