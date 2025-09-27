export const stats = ['ag', 'co', 'em', 'in', 'me', 'pr', 'qu', 're', 'sd', 'st'];

export const resistances = ['channeling', 'mentalism', 'essence', 'physical', 'poison', 'disease', 'fear'];

export const raceCreateTemplate = {
  name: '',
  realmId: '',
  archetype: '',
  sizeId: 'medium',
  stats: {
    ag: 0,
    co: 0,
    em: 0,
    in: 0,
    me: 0,
    pr: 0,
    qu: 0,
    re: 0,
    sd: 0,
    st: 0,
  },
  resistances: {
    channeling: 0,
    mentalism: 0,
    essence: 0,
    physical: 0,
    poison: 0,
    disease: 0,
    fear: 0,
  },
  averageHeight: {
    male: 0,
    female: 0,
  },
  averageWeight: {
    male: 0,
    female: 0,
  },
  strideBonus: 0,
  enduranceBonus: 0,
  recoveryMultiplier: 1,
  baseHits: 0,
  baseDevPoints: 60,
  baseAt: 1,
  defaultLanguage: '',
  talents: [],
  description: '',
} as CreateRaceDto;

export type Race = {
  id: string;
  name: string;
  archetype: string | undefined;
  realmId: string;
  realmName: string;
  sizeId: string;
  stats: RaceStats;
  resistances: RaceResistances;
  averageHeight: AverageHeight;
  averageWeight: AverageWeight;
  strideBonus: number;
  enduranceBonus: number;
  recoveryMultiplier: number;
  baseHits: number;
  baseDevPoints: number;
  baseAt: number;
  defaultLanguage: string | undefined;
  talents: string[];
  description: string | undefined;
};

export type RaceStats = {
  ag: number;
  co: number;
  em: number;
  in: number;
  me: number;
  pr: number;
  qu: number;
  re: number;
  sd: number;
  st: number;
};

export type RaceResistances = {
  channeling: number;
  mentalism: number;
  essence: number;
  physical: number;
  poison: number;
  disease: number;
};

export type AverageHeight = {
  male: number;
  female: number;
};

export type AverageWeight = {
  male: number;
  female: number;
};

export type CreateRaceDto = Omit<Race, 'id' | 'realmName'>;

export type UpdateRaceDto = Partial<Omit<Race, 'id' | 'realmId' | 'realmName'>>;
