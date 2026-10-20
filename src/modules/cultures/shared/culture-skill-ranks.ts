import { CultureRegion, CultureSkillRank, CultureSkillRankType } from '@labcabrera-rmu/rmu-react-shared-lib';
import { TFunction } from 'i18next';

export const CULTURE_SKILL_RANK_TYPES: CultureSkillRankType[] = [
  'skill',
  'skill-choice',
  'category-pool',
  'languages',
  'region',
];

export const CULTURE_REGIONS: CultureRegion[] = ['own', 'neighboring'];

/** Indicative cost above which the culture is flagged (informative only, §12.6). */
export const CULTURE_DEVELOPMENT_COST_LIMIT = 80;

export const cultureSkillRankTypeLabel = (type: CultureSkillRankType, t: TFunction): string =>
  t(`culture-skill-rank-type-${type}`);

export const cultureRegionLabel = (region: CultureRegion, t: TFunction): string => t(`culture-region-${region}`);

/** Human readable target of an entry: the skill, the skill options, the categories or the region. */
export const cultureSkillRankTarget = (entry: CultureSkillRank, t: TFunction): string => {
  switch (entry.type) {
    case 'skill':
      return entry.specialization ? `${t(entry.skillId || '')} (${t(entry.specialization)})` : t(entry.skillId || '');
    case 'skill-choice':
      return (entry.skillIds || []).map((id) => t(id)).join(', ');
    case 'category-pool':
      return (entry.categoryIds || []).map((id) => t(id)).join(', ');
    case 'region':
      return `${t(entry.skillId || '')} (${entry.region ? cultureRegionLabel(entry.region, t) : ''})`;
    case 'languages':
    default:
      return t('languages');
  }
};

/** Keeps only the fields the API accepts for the entry type. */
export const normalizeCultureSkillRank = (entry: CultureSkillRank): CultureSkillRank => {
  const { type, ranks } = entry;
  switch (type) {
    case 'skill':
      return {
        type,
        ranks,
        skillId: entry.skillId,
        ...(entry.specialization ? { specialization: entry.specialization } : {}),
      };
    case 'skill-choice':
      return { type, ranks, skillIds: entry.skillIds, ...maxRanks(entry) };
    case 'category-pool':
      return { type, ranks, categoryIds: entry.categoryIds, ...maxRanks(entry) };
    case 'region':
      return { type, ranks, skillId: entry.skillId, region: entry.region };
    case 'languages':
    default:
      return { type, ranks };
  }
};

const maxRanks = (entry: CultureSkillRank) =>
  entry.maxRanksPerSkill ? { maxRanksPerSkill: entry.maxRanksPerSkill } : {};

export const isValidCultureSkillRank = (entry: CultureSkillRank): boolean => {
  if (!entry.type || !entry.ranks || entry.ranks <= 0) return false;
  switch (entry.type) {
    case 'skill':
      return !!entry.skillId;
    case 'skill-choice':
      return !!entry.skillIds && entry.skillIds.length > 0;
    case 'category-pool':
      return !!entry.categoryIds && entry.categoryIds.length > 0;
    case 'region':
      return !!entry.skillId && !!entry.region;
    case 'languages':
      return true;
    default:
      return false;
  }
};
