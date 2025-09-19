import { buildErrorFromResponse } from './api-errors';
import { Page } from './common.dto';
import { CreateLanguageDto, Language, UpdateLanguageDto } from './language.dto';

export async function fetchLanguage(LanguageId: string): Promise<Language> {
  const url = `${process.env.RMU_API_CORE_URL}/Languages/${LanguageId}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchLanguages(rsql: string, page: number, size: number): Promise<Language[]> {
  const url = `${process.env.RMU_API_CORE_URL}/Languages?q=${rsql}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  const pageContent = await response.json();
  return pageContent.content;
}

export async function fetchPagedLanguages(rsql: string, page: number, size: number): Promise<Page<Language>> {
  const url = `${process.env.RMU_API_CORE_URL}/Languages?q=${rsql}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  const pageContent = await response.json();
  return pageContent;
}

export async function createLanguage(Language: CreateLanguageDto): Promise<Language> {
  const url = `${process.env.RMU_API_CORE_URL}/Languages`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Language),
  });
  if (response.status !== 201) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function updateLanguage(LanguageId: string, dto: UpdateLanguageDto): Promise<Language> {
  const url = `${process.env.RMU_API_CORE_URL}/Languages/${LanguageId}`;
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

export async function deleteLanguage(realmId: string): Promise<void> {
  const url = `${process.env.RMU_API_CORE_URL}/Languages/${realmId}`;
  const response = await fetch(url, { method: 'DELETE' });
  if (response.status !== 204) {
    throw await buildErrorFromResponse(response, url);
  }
}
