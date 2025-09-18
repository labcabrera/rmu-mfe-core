import { buildErrorFromResponse } from './api-errors';

export type Race = {
  id: string;
  name: string;
  realmId: string;
  stats: RaceStats;
  resistances: RaceResistances;
  averageHeight: AverageHeight;
  averageWeight: AverageWeight;
  strideBonus: number;
  enduranceBonus: number;
  recoveryMultiplier: number;
  baseHits: number;
  baseDevPoints: number;
  baseAt: number;
  defaultLanguage: string | undefined;
  availableLanguages: string[];
  talents: string[];
  description?: string;
};

export type RaceStats = {
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
  poison: number;
  disease: number;
};

export type AverageHeight = {
  male: number;
  female: number;
};

export type AverageWeight = {
  male: number;
  female: number;
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
