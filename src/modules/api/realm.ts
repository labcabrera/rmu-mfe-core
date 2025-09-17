import { buildErrorFromResponse } from './api-errors';

export type Realm = {
  id: string;
  [key: string]: any;
};

export type CreateRealmDto = {
  name: string;
  description?: string;
};

export async function fetchRealm(realmId: string): Promise<Realm> {
  const url = `${process.env.RMU_API_CORE_URL}/realms/${realmId}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchRealms(rsql: string, page: number, size: number): Promise<Realm[]> {
  const url = `${process.env.RMU_API_CORE_URL}/realms?q=${rsql}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  const pageContent = await response.json();
  return pageContent.content;
}
