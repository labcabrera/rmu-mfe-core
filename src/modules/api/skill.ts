import { getAuthHeaders } from '../services/auth-token-service';
import { apiCoreUrl } from '../services/config';
import { buildErrorFromResponse } from './api-errors';
import { Page } from './common.dto';
import { Skill } from './skill.dto';

export async function fetchSkill(skillId: string): Promise<Skill> {
  const url = `${apiCoreUrl}/skills/${skillId}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchPagedSkills(rsql: string, page: number, size: number): Promise<Page<Skill>> {
  const url = `${apiCoreUrl}/skills?q=${rsql}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  const json = await response.json();
  return json as Page<Skill>;
}
