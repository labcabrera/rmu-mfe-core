import { AccessType } from './common.dto';

export interface Skill {
  id: string;
  categoryId: string;
  bonus: string[];
  specialization: string;
  owner: string;
  accessType: AccessType;
}

export type CreateSkillDto = Omit<Skill, 'owner'>;

export type UpdateSkillDto = Partial<Omit<Skill, 'id' | 'owner'>>;
