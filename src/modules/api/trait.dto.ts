export type Trait = {
  id: string;
  isTalent: boolean;
  requiresSpecialization: boolean;
  isTierBased: boolean;
  maxTier: number | undefined;
  cost: number | undefined;
  description: string | undefined;
};

export type CreateTraitDto = Trait;

export type UpdateTraitDto = Partial<Omit<Trait, 'id'>>;
