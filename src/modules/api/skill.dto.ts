export interface Skill {
  id: string;
  categoryId: string;
  bonus: string[];
  specialization: string;
}

export interface CreateSkillDto {
  id: string;
  categoryId: string;
  bonus?: string[];
  specialization: string | null;
}
