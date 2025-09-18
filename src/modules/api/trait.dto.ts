export type Trait = {
  id: string;
  isTalent: boolean;
  requiresSpecialization: boolean;
  cost: number | undefined;
  description: string | undefined;
};

export type CreateTraitDto = Trait;

export type UpdateTraitDto = Partial<Omit<Trait, 'id'>>;
