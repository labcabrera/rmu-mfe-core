import { buildErrorFromResponse } from './api-errors';
import { CreateRealmDto, Realm } from './realm.dto';

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

export async function createRealm(realm: CreateRealmDto): Promise<Realm> {
  const url = `${process.env.RMU_API_CORE_URL}/realms`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(realm),
  });
  if (response.status !== 201) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function updateRealm(realmId: string, realm: Partial<Realm>): Promise<Realm> {
  const url = `${process.env.RMU_API_CORE_URL}/realms/${realmId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(realm),
  });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function deleteRealm(realmId: string): Promise<void> {
  const url = `${process.env.RMU_API_CORE_URL}/realms/${realmId}`;
  const response = await fetch(url, { method: 'DELETE' });
  if (response.status !== 204) {
    throw await buildErrorFromResponse(response, url);
  }
}
