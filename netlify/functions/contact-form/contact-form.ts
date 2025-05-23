import { Handler } from '@netlify/functions';
import { addNewMessageToDatabase } from './notion';

const SENDERS: {
  [key: string]: Date;
} = {};

const isSpam = (host: string) => {
  const now = new Date();
  const lastSent = SENDERS[host];
  if (lastSent) {
    const diff = now.getTime() - lastSent.getTime();
    if (diff < 1000 * 60 * 10) return true;
  }
  SENDERS[host] = now;
  return false;
};

export const handler: Handler = async (event, context) => {
  const {
    httpMethod,
    headers: { host },
    body,
  } = event;

  console.info('Sending message from: ', host);

  if (!body || !host) return { statusCode: 400, body: 'Bad Request' };
  if (httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  if (isSpam(host)) return { statusCode: 429, body: 'Too Many Requests' };

  try {
    console.log('body', body);

    const formData = JSON.parse(body);
    const { name, email, message } = formData;

    await addNewMessageToDatabase({ name, email, message });
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'success',
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
