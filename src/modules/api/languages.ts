import { getAuthHeaders, mergeJsonHeaders } from '../services/auth-token-service';
import { apiCoreUrl } from '../services/config';
import { buildErrorFromResponse } from './api-errors';
import { Page } from './common.dto';
import { CreateLanguageDto, Language, UpdateLanguageDto } from './language.dto';

export async function fetchLanguage(LanguageId: string): Promise<Language> {
  const url = `${apiCoreUrl}/languages/${LanguageId}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchLanguages(rsql: string, page: number, size: number): Promise<Language[]> {
  const url = `${apiCoreUrl}/languages?q=${rsql}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  const pageContent = await response.json();
  return pageContent.content;
}

export async function fetchPagedLanguages(rsql: string, page: number, size: number): Promise<Page<Language>> {
  const url = `${apiCoreUrl}/languages?q=${rsql}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  const pageContent = await response.json();
  return pageContent;
}

export async function createLanguage(Language: CreateLanguageDto): Promise<Language> {
  const url = `${apiCoreUrl}/languages`;
  const response = await fetch(url, {
    method: 'POST',
    headers: mergeJsonHeaders(),
    body: JSON.stringify(Language),
  });
  if (response.status !== 201) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function updateLanguage(LanguageId: string, dto: UpdateLanguageDto): Promise<Language> {
  const url = `${apiCoreUrl}/languages/${LanguageId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: mergeJsonHeaders(),
    body: JSON.stringify(dto),
  });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function deleteLanguage(realmId: string): Promise<void> {
  const url = `${apiCoreUrl}/languages/${realmId}`;
  const response = await fetch(url, { method: 'DELETE', headers: getAuthHeaders() });
  if (response.status !== 204) {
    throw await buildErrorFromResponse(response, url);
  }
}
