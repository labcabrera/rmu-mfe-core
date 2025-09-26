export type Trait = {
  id: string;
  name: string;
  category: string;
  isTalent: boolean;
  specialization: string;
  isTierBased: boolean;
  maxTier: number | undefined;
  adquisitionCost: number;
  tierCost: number | undefined;
  description: string | undefined;
};

export type CreateTraitDto = Omit<Trait, 'id'>;

export type UpdateTraitDto = Partial<Omit<Trait, 'id'>>;
