using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace EnergyMonitorServices.Response
{
    public class HttpApiResponse
    {
        public HttpStatusCode HttpStatusCode { get; set; }
        public object Data { get; set; }
        public HttpApiResponse(HttpStatusCode httpStatusCode, object data)
        {
            this.HttpStatusCode = httpStatusCode;
            this.Data = data;
        }
    }
}
