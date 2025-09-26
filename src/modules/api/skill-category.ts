import { buildErrorFromResponse } from './api-errors';
import { SkillCategory } from './skill-category.dto';
import { Skill } from './skill.dto';

export async function fetchSkillCategory(skillCategoryId: string): Promise<Skill> {
  const url = `${process.env.RMU_API_CORE_URL}/skill-categories/${skillCategoryId}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchSkillCategories(): Promise<SkillCategory[]> {
  const url = `${process.env.RMU_API_CORE_URL}/skill-categories`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  const json = await response.json();
  return json as SkillCategory[];
}
