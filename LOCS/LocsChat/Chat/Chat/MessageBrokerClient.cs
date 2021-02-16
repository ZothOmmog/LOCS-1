using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Chat.DataBaseModels;
using System.Text.Json;
using System.Text;
using Newtonsoft.Json;

namespace Chat
{
    public class MessageBrokerClient : IDisposable
    {

        private ConnectionFactory _factory;
        private IConnection _connection;
        private IModel _channel;
        public MessageBrokerClient(string host)
        {
            _factory = new ConnectionFactory() { HostName = host };
            _connection = _factory.CreateConnection();
            _channel = _connection.CreateModel();
        }

        public void GetQueueMessages(long? userId)
        {

            var result = _channel.BasicGet(userId.ToString(), false);
            var a = result;
            //return null;
        }

        public void SendMessage(ChatMessage message)
        {
            //_channel.ExchangeDeclare(exchange: message.SenderId.ToString(), type: "topic");
            try
            {
                _channel.ExchangeDeclare(exchange: message.SenderId.ToString(), type: "topic");
            }
            catch (Exception e) { }

            try
            {
                _channel.QueueDeclare(queue: message.RecipientId.ToString(), durable: true, exclusive: false, autoDelete: false, arguments: null);
            }
            catch (Exception e) { }

            //var json = System.Text.Json.JsonSerializer.Serialize(message);
            //var body = System.Text.Encoding.Unicode.GetBytes(json);

            var json = JsonConvert.SerializeObject(message);
            var body = Encoding.UTF8.GetBytes(json);

            var properties = _channel.CreateBasicProperties();
            properties.Persistent = true;

            _channel.BasicPublish(exchange: "",
                                    routingKey: message.RecipientId.ToString(),
                                    basicProperties: properties,
                                    body: body);
        }


        public string Connect(long clientId, string connectionId, Action<string, ChatMessage, string> messageCallback)
        {
            // var queueName = _channel.QueueDeclare(queue: clientId.ToString(), durable: true, exclusive: false, autoDelete: false, arguments: null).QueueName;
            try
            {
                _channel.ExchangeDeclare(exchange: clientId.ToString(), type: "topic");
            }
            catch (Exception e) { }

            try
            {
                _channel.QueueDeclare(queue: clientId.ToString(), durable: true, exclusive: false, autoDelete: false, arguments: null);

            }
            catch (Exception ex)
            {

            }
            try
            {
                _channel.QueueBind(queue: clientId.ToString(), exchange: clientId.ToString(), routingKey: clientId.ToString());
            }
            catch (Exception ex)
            {

            }

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {

                var content = Encoding.UTF8.GetString(ea.Body.ToArray());
                var message = JsonConvert.DeserializeObject<ChatMessage>(content);
                var routingKey = ea.RoutingKey;
                messageCallback.Invoke(routingKey, message, connectionId);

                _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);

            };

            var consumerTag = _channel.BasicConsume(queue: clientId.ToString(), autoAck: false, consumer: consumer);

            return consumerTag;


        }

        public void CancelConsumer(string consumerTag)
        {
            _channel.BasicCancel(consumerTag);
        }

        public void CancelOnDisconect(string tag)
        {
            _channel.BasicCancel(tag);
          //  Dispose();
        }


        public void Dispose()
        {
            _channel.Close();
            _connection.Close();
            _channel.Dispose();
            _connection.Dispose();
        }

    }



    public class TEST
    {

        public long Id { get; set; }
        public long? SenderId { get; set; }
        public long? RecipientId { get; set; }
        public string Message { get; set; }
        public bool isRead { get; set; }
    }
}