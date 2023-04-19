using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EnergyMonitorServices.BusinessDataAccess;
using EnergyMonitorServices.BusinessEntities;
using EnergyMonitorServices.BusinessManager;
using EnergyMonitorServices.Response;
using System.Net;

namespace EnergyMonitorServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevicesController : ControllerBase
    {
        private IDevicesManager devicesManager;
        public DevicesController(IDevicesManager devicesManager)
        {
            this.devicesManager = devicesManager;
        }
        /// <summary>
        /// This is api function to get all the record from the table Devices
        /// </summary>
        /// <param name="Devices">Devices</param>
        /// <returns>HttpApiResponse</returns>
        [HttpGet]
        [Route("GetDevices")]
        public async Task<HttpApiResponse> GetDevices()
        {
            Devices devices = new Devices();
            var result = await this.devicesManager.GetDevices(devices);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// This is api function is to update row to the table cities
        /// </summary>
        /// <param name="cities">cities</param>
        /// <returns>HttpApiResponse</returns>

        [HttpPost]
        [Route("GetDevicebyId")]
        public async Task<HttpApiResponse> GetDevicebyId(Devices devices)
        {
            var result = await this.devicesManager.GetDeviceByPrimaryId(devices);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// This is api function is to insert row to the table Devices
        /// </summary>
        /// <param name="devices">Devices</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("AddDevice")]
        public async Task<HttpApiResponse> AddDevice(Devices devices)
        {
            try
            {
              
                var result = await this.devicesManager.InsertDevice(devices);
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
        [Route("UpdateDevice")]
        public async Task<HttpApiResponse> UpdateDevice(Devices devices)
        {
            var result = await this.devicesManager.UpdateDevice(devices);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// This is api function to delete the row from the table Devices by primary Key of the table
        /// </summary>
        /// <param name="NVarChar">deviceid</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("DeleteDevice")]
        public async Task<HttpApiResponse> DeleteDevice(Devices devices)
        {
            
            var result = await this.devicesManager.DeleteDevice(devices);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }
    }
}
