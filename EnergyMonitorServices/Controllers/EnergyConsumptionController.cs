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
    public class EnergyConsumptionController : ControllerBase
    {
        private IEnergyConsumptionManager energyConsumptionManager;
        public EnergyConsumptionController(IEnergyConsumptionManager energyConsumptionManager)
        {
            this.energyConsumptionManager = energyConsumptionManager;
        }

        /// <summary>
        /// This is api function to get all the record from the table energyConsumption
        /// </summary>
        /// <param name="energyConsumption">energyConsumption</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("GetEnergyConsumption")]
        public async Task<HttpApiResponse> GetEnergyConsumption(EnergyConsumption energyConsumption)
        {
            var result = await this.energyConsumptionManager.GetEnergyConsumptionbyDeviceId(energyConsumption);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// This is api function to get all the record from the table energyConsumption
        /// </summary>
        /// <param name="energyConsumption">energyConsumption</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("GetEnergyConsumptionbyDate")]
        public async Task<HttpApiResponse> GetEnergyConsumptionbyDate(EnergyConsumption energyConsumption)
        {
            var result = await this.energyConsumptionManager.GetEnergyConsumptionbyDate(energyConsumption);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }


        /// <summary>
        /// This is api function to get all the record from the table energyConsumption
        /// </summary>
        /// <param name="energyConsumption">energyConsumption</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("GetEnergyConsumptionbyId")]
        public async Task<HttpApiResponse> GetEnergyConsumptionbyId(EnergyConsumption energyConsumption)
        {
            var result = await this.energyConsumptionManager.GetEnergyConsumptionbyEnergyId(energyConsumption);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// This is api function is to insert row to the table EnergyConsumption
        /// </summary>
        /// <param name="EnergyConsumption">EnergyConsumption</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("AddEnergyConsumption")]
        public async Task<HttpApiResponse> AddEnergyConsumption(EnergyConsumption energyConsumption)
        {
            try
            {

                var result = await this.energyConsumptionManager.InserEnergyConsumption(energyConsumption);
                return new HttpApiResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return new HttpApiResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        /// <summary>
        /// This is api function is to insert row to the table EnergyConsumption
        /// </summary>
        /// <param name="EnergyConsumption">EnergyConsumption</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPut]
        [Route("UpdateEnergyConsumption")]
        public async Task<HttpApiResponse> UpdateEnergyConsumption(EnergyConsumption energyConsumption)
        {
            try
            {

                var result = await this.energyConsumptionManager.UpdateEnergyConsumption(energyConsumption);
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
        /// <param name="EnergyConsumption">EnergyConsumption</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("DeleteEnergyConsumption")]
        public async Task<HttpApiResponse> DeleteEnergyConsumption(EnergyConsumption energyConsumption)
        {
            var result = await this.energyConsumptionManager.DeleteEnergyConsumption(energyConsumption);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }
    }
}
