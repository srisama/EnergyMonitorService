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
    public class EnergyUsageSummaryController : ControllerBase
    {
        private IEnergyUsageSummaryManager energyUsageSummaryManager;
        public EnergyUsageSummaryController(IEnergyUsageSummaryManager energyUsageSummaryManager)
        {
            this.energyUsageSummaryManager = energyUsageSummaryManager;
        }

        /// <summary>
        /// This is api function to get all the record from the table energyUsageSummary
        /// </summary>
        /// <param name="energyUsageSummary">energyUsageSummary</param>
        /// <returns>HttpApiResponse</returns>
        [HttpGet]
        [Route("GetEnergyUsageSummary")]
        public async Task<HttpApiResponse> GetEnergyUsageSummary()
        {
            EnergyUsageSummary energyUsageSummary = new EnergyUsageSummary();
            var result = await this.energyUsageSummaryManager.GetEnergyUsageSummaries(energyUsageSummary);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// This is api function to get all the record from the table energyUsageSummary
        /// </summary>
        /// <param name="energyUsageSummary">energyUsageSummary</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("GetEnergyUsageSummarybyId")]
        public async Task<HttpApiResponse> GetEnergyUsageSummarybyId(EnergyUsageSummary energyUsageSummary)
        {
            var result = await this.energyUsageSummaryManager.GetEnergyUsageSummaryByPrimaryId(energyUsageSummary);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }
        /// <summary>
        /// This is api function to get all the record from the table energyUsageSummary
        /// </summary>
        /// <param name="energyUsageSummary">energyUsageSummary</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("EnergyConsumptionbyTwoDates")]
        public async Task<HttpApiResponse> EnergyConsumptionbyTwoDates(EnergyUsageSummary energyUsageSummary)
        {
            var result = await this.energyUsageSummaryManager.EnergyUsagebyTwoDates(energyUsageSummary);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }

        /// <summary>
        /// This is api function is to insert row to the table energyUsageSummary
        /// </summary>
        /// <param name="energyUsageSummary">energyUsageSummary</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("AddEnergyUsageSummary")]
        public async Task<HttpApiResponse> AddEnergyUsageSummary(EnergyUsageSummary energyUsageSummary)
        {
            try
            {

                var result = await this.energyUsageSummaryManager.InsertEnergyUsageSummary(energyUsageSummary);
                return new HttpApiResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return new HttpApiResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        /// <summary>
        /// This is api function is to insert row to the table energyUsageSummary
        /// </summary>
        /// <param name="energyUsageSummary">energyUsageSummary</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPut]
        [Route("UpdateEnergyUsageSummary")]
        public async Task<HttpApiResponse> energyUsageSummary(EnergyUsageSummary energyUsageSummary)
        {
            try
            {

                var result = await this.energyUsageSummaryManager.UpdateEnergyUsageSummary(energyUsageSummary);
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
        /// <param name="energyUsageSummary">energyUsageSummary</param>
        /// <returns>HttpApiResponse</returns>
        [HttpPost]
        [Route("DeleteEnergyUsageSummary")]
        public async Task<HttpApiResponse> DeleteEnergyUsageSummary(EnergyUsageSummary energyUsageSummary)
        {
            var result = await this.energyUsageSummaryManager.DeleteEnergyUsageSummary(energyUsageSummary);
            return new HttpApiResponse(HttpStatusCode.OK, result);
        }
    }
}
