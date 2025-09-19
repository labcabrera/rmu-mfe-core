import { buildErrorFromResponse } from './api-errors';
import { Page } from './common.dto';
import { CreateTraitDto, Trait, UpdateTraitDto } from './trait.dto';

export async function fetchTrait(traitId: string): Promise<Trait> {
  const url = `${process.env.RMU_API_CORE_URL}/traits/${traitId}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchTraits(rsql: string, page: number, size: number): Promise<Trait[]> {
  const url = `${process.env.RMU_API_CORE_URL}/traits?q=${rsql}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  const pageContent = await response.json();
  return pageContent.content;
}

export async function fetchPagedTraits(rsql: string, page: number, size: number): Promise<Page<Trait>> {
  const url = `${process.env.RMU_API_CORE_URL}/traits?q=${rsql}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  const pageContent = await response.json();
  return pageContent;
}

export async function createTrait(trait: CreateTraitDto): Promise<Trait> {
  const url = `${process.env.RMU_API_CORE_URL}/traits`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(trait),
  });
  if (response.status !== 201) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function updateTrait(traitId: string, dto: UpdateTraitDto): Promise<Trait> {
  const url = `${process.env.RMU_API_CORE_URL}/traits/${traitId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function deleteTrait(realmId: string): Promise<void> {
  const url = `${process.env.RMU_API_CORE_URL}/traits/${realmId}`;
  const response = await fetch(url, { method: 'DELETE' });
  if (response.status !== 204) {
    throw await buildErrorFromResponse(response, url);
  }
}
