using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Text;

namespace Chat
{


    interface ISerializer
    {
        string ContentType { get; }
        byte[] Serialize(object data);
        T Deserialize<T>(byte[] body);
    }


    public class JSONSerializer : ISerializer
    {
        public string ContentType { get; } = "application/json";
        public byte[] Serialize(object data)
        {
            var body = string.Empty;
            try
            {
                body = JsonConvert.SerializeObject(data, new JsonSerializerSettings()
                {
                    NullValueHandling = NullValueHandling.Ignore,
                    TypeNameHandling = TypeNameHandling.Auto
                });
            }
            catch (System.Exception ex)
            {
                throw;
            }

            return Encoding.UTF8.GetBytes(body);
        }

        public T Deserialize<T>(byte[] body)
        {
            try
            {
                var data = Encoding.UTF8.GetString(body);

                return JsonConvert.DeserializeObject<T>(data, new JsonSerializerSettings { TypeNameHandling = TypeNameHandling.Auto });
            }
            catch (System.Exception ex)
            {

                throw;
            }
        }
    }


}
