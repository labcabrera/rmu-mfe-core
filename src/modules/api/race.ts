import { buildErrorFromResponse } from './api-errors';

export type Race = {
  id: string;
  name: string;
  realm: string;
  defaultStatBonus: RaceStatBonus;
  resistances: RaceResistances;
  description?: string;
  [key: string]: any;
};

export type RaceStatBonus = {
  ag: number;
  co: number;
  em: number;
  in: number;
  me: number;
  pr: number;
  qu: number;
  re: number;
  sd: number;
  st: number;
};

export type RaceResistances = {
  channeling: number;
  mentalism: number;
  essence: number;
  physical: number;
};

export type CreateRaceDto = {
  id: string;
  name: string;
  realm: string;
  defaultStatBonus: RaceStatBonus;
  resistances: RaceResistances;
  description: string | undefined;
};

export type UpdateRaceDto = {
  id: string;
  name: string;
  description?: string;
};

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
