import { useTranslation } from 'react-i18next';
import {
  EnumPicker,
  FIGHTING_STYLE_SKILLS,
  FightingStyle,
  FilterSchema,
  FilterSearchField,
  FilterSection,
  ListFilters,
  normalizeText,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { TFunction } from 'i18next';

const list = (value: string | string[]) => (Array.isArray(value) ? value : [value]);

/** Filters of the style list, kept in the URL and applied on the client: the catalog is one document. */
export const fightingStyleFilters = (t: TFunction): FilterSchema<FightingStyle> => ({
  q: {
    kind: 'text',
    label: t('name'),
    match: (style, value) => {
      const needle = normalizeText(String(value).trim());
      return [t(style.id), ...style.abilities.map((entry) => t(`style-ability-${entry.abilityId}`))].some((name) =>
        normalizeText(name).includes(needle)
      );
    },
  },
  skill: {
    kind: 'multiple',
    label: t('fighting-style-type'),
    options: FIGHTING_STYLE_SKILLS,
    format: (value) => t(value),
    match: (style, value) => list(value).includes(style.skillId),
  },
});

export default function FightingStyleListFilters({ filters }: { filters: ListFilters<FightingStyle> }) {
  const { t } = useTranslation();
  // Built outside the JSX: the i18n lint reads string arguments there as visible text.
  const skill = {
    mode: 'multiple' as const,
    value: filters.getAll('skill'),
    onChange: (ids: string[]) => filters.set('skill', ids),
  };

  return (
    <>
      <FilterSection title={t('search')} collapsible={false}>
        <FilterSearchField filters={filters} filter="q" label={t('search-fighting-style')} />
      </FilterSection>
      <FilterSection title={t('fighting-style')}>
        <EnumPicker {...skill} label={t('fighting-style-type')} values={FIGHTING_STYLE_SKILLS} />
      </FilterSection>
    </>
  );
}
