import { Client } from '@microsoft/microsoft-graph-client'

const getAuthenticatedClient = (accessToken: any) => {
  // Initialize Graph client
  const client = Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done) => {
      done(null, accessToken.accessToken);
    }
  });

  return client;
}

export const getUserDetails = async (accessToken: any) => {
  const client = getAuthenticatedClient(accessToken);
  const user = await client.api('/me').get();
  
  return user;
}

export const getEvents = async (accessToken: any) => {
  const client = getAuthenticatedClient(accessToken)
  const events = await client
  .api('/me/events')
  .select('subject, organizer, start, end')
  .orderby('createdDateTime DESC')
  .get()

  return events
}