const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://user:password@rabbitmq:5672';
const QUEUE_NAME = 'race_queue';

let channel;

async function connect(retryCount = 5) {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log(`Połączono z RabbitMQ, kolejka: ${QUEUE_NAME}`);

    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        console.log('Odebrano wiadomość z kolejki:', msg.content.toString());
        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error('Błąd połączenia z RabbitMQ:', err.message);
    if (retryCount > 0) {
      console.log(`Próba ponownego połączenia za 3 sekundy... (${retryCount} pozostało)`);
      setTimeout(() => connect(retryCount - 1), 3000);
    }
  }
}

function sendMessage(msg) {
  if (!channel) {
    console.error('Kanał RabbitMQ nie jest gotowy');
    return;
  }
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(msg)), { persistent: true });
  console.log('Wysłano wiadomość:', msg);
}

module.exports = { connect, sendMessage };
