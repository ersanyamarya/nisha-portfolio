import { Client } from '@notionhq/client';

export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function postNewPage(properties: Record<string, any>) {
  return await notionClient.pages
    .create({
      parent: {
        type: 'database_id',
        database_id: process.env.NOTION_DATABASE_ID as string,
      },
      properties,
    })
    .then(res => res.id);
}

export async function addNewMessageToDatabase({ name, email, message }) {
  console.info('Adding new message to database: ', name, email, message);
  const properties = {
    Name: {
      title: [
        {
          text: {
            content: name,
          },
        },
      ],
    },
    Email: {
      email,
    },
    Message: {
      rich_text: [
        {
          text: {
            content: message,
          },
        },
      ],
    },
  };

  return await postNewPage(properties);
}
