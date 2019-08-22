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

export async function getPeople(accessToken: string) {
  const client = getAuthenticatedClient(accessToken)

  const people = await client
    .api('users')
    .top(300)
    .get()
  console.log('getPeople')
  return people
}

export async function getPhotoForUser(accessToken: string, userId: string) {
  const client = getAuthenticatedClient(accessToken)
  let blobUrl: string | undefined
  try {
    const photo = await client
      .api(`users/${userId}/photo/$value`)
      .get()

    const url = window.URL || (window as any).webkitURL;
    blobUrl = url.createObjectURL(photo);
    console.log(`Got Avatar for ${userId}`)
  } catch (err) {
    blobUrl = undefined
    console.log(`No Avatar for ${userId}`)
  }
  return blobUrl
}