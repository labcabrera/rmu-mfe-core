import { getAuthHeaders } from '../services/auth-token-service';
import { apiCoreUrl } from '../services/config';
import { buildErrorFromResponse } from './api-errors';
import { Page } from './common.dto';
import { SkillCategory } from './skill-category.dto';
import { Skill } from './skill.dto';

export async function fetchSkillCategory(skillCategoryId: string): Promise<Skill> {
  const url = `${apiCoreUrl}/skill-categories/${skillCategoryId}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchSkillCategories(): Promise<SkillCategory[]> {
  const url = `${apiCoreUrl}/skill-categories?page=0&size=100`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  const json = await response.json();
  return json.content as SkillCategory[];
}

export async function fetchPagedSkillCategories(
  query: string,
  page: number,
  size: number
): Promise<Page<SkillCategory>> {
  const url = `${apiCoreUrl}/skill-categories?q=${query}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  const json = await response.json();
  return json as Page<SkillCategory>;
}
