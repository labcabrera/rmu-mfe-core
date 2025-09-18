import { buildErrorFromResponse } from './api-errors';
import { CreateRaceDto, Race, UpdateRaceDto } from './race.dto';

export async function fetchRace(raceId: string): Promise<Race> {
  const url = `${process.env.RMU_API_CORE_URL}/races/${raceId}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchRaces(rsql: string, page: number, size: number): Promise<Race[]> {
  const url = `${process.env.RMU_API_CORE_URL}/races?q=${rsql}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  const pageContent = await response.json();
  return pageContent.content;
}

export async function createRace(data: CreateRaceDto): Promise<Race> {
  const url = `${process.env.RMU_API_CORE_URL}/races`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response.status !== 201) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function updateRace(raceId: string, data: UpdateRaceDto): Promise<Race> {
  const url = `${process.env.RMU_API_CORE_URL}/races/${raceId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function deleteRace(raceId: string): Promise<void> {
  const url = `${process.env.RMU_API_CORE_URL}/races/${raceId}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });
  if (response.status !== 204) {
    throw await buildErrorFromResponse(response, url);
  }
}
