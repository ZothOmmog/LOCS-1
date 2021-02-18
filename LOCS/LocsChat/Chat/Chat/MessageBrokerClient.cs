using System;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Chat.DataBaseModels;
using System.Text;
using Newtonsoft.Json;
using Chat.Models;
using System.Collections.Generic;

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

        /// <summary>
        /// отправка сообщения в чат
        /// </summary>
        /// <param name="message"></param>
        /// <param name="groupsId"></param>
        public void SendMessage(MessageModel message, List<long?> groupsId)
        {
            try
            {
                _channel.ExchangeDeclare(exchange: message.SenderId.ToString(), type: "topic");
            }
            catch (Exception e) { }

            var json = JsonConvert.SerializeObject(message);
            var body = Encoding.UTF8.GetBytes(json);

            var properties = _channel.CreateBasicProperties();
            properties.Persistent = true;


            foreach (var id in groupsId) {
                try
                {
                    _channel.QueueDeclare(queue: id.ToString(), durable: true, exclusive: false, autoDelete: false, arguments: null);
                }
                catch (Exception e) { }

                _channel.BasicPublish(exchange: "",
                                        routingKey: id.ToString(),
                                        basicProperties: properties,
                                        body: body); 
            }
        }

        /// <summary>
        /// получение сообщений из брокера
        /// </summary>
        /// <param name="clientId"></param>
        /// <param name="connectionId"></param>
        /// <param name="messageCallback"></param>
        /// <returns></returns>
        public string Connect(long clientId, string connectionId, Action<string, MessageModel, string> messageCallback)
        {
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
            { }

            try
            {
                _channel.QueueBind(queue: clientId.ToString(), exchange: clientId.ToString(), routingKey: clientId.ToString());
            }
            catch (Exception ex)
            { }

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {

                var content = Encoding.UTF8.GetString(ea.Body.ToArray());
                var message = JsonConvert.DeserializeObject<MessageModel>(content);
                var routingKey = ea.RoutingKey;

                messageCallback.Invoke(routingKey, message, connectionId);

                _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);

            };

            var consumerTag = _channel.BasicConsume(queue: clientId.ToString(), autoAck: false, consumer: consumer);

            return consumerTag;
        }

        public void CancelOnDisconect(string tag)
        {
            _channel.BasicCancel(tag);
        }


        public void Dispose()
        {
            _channel.Close();
            _connection.Close();
            _channel.Dispose();
            _connection.Dispose();
        }

    }
}