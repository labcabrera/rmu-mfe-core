import { buildErrorFromResponse } from './api-errors';
import { Page } from './common.dto';
import { Skill } from './skill.dto';

export async function fetchSkill(skillId: string): Promise<Skill> {
  const url = `${process.env.RMU_API_CORE_URL}/skills/${skillId}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchPagedSkills(rsql: string, page: number, size: number): Promise<Page<Skill>> {
  const url = `${process.env.RMU_API_CORE_URL}/skills?q=${rsql}&page=${page}&size=${size}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  const json = await response.json();
  return json as Page<Skill>;
}
