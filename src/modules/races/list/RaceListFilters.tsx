import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import {
  CREATURE_SIZES,
  ENTITY_SOURCES,
  entitySourceFilter,
  EnumPicker,
  FilterSchema,
  FilterSearchField,
  FilterSection,
  ListFilters,
  normalizeText,
  NumericInput,
  Race,
  Realm,
  realmName,
  RealmPicker,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { TFunction } from 'i18next';
import { archetypeLabel, raceArchetypeKey, raceName } from '../race-format';

/** Values of the access filter (`accessType` of a race). */
export const RACE_ACCESS_TYPES = ['public', 'private'];

const list = (value: string | string[]) => (Array.isArray(value) ? value : [value]);
const integer = (value: string | string[]) => {
  const number = Number(value);
  return String(value).trim() !== '' && Number.isInteger(number) ? number : null;
};
const range = (field: string, operator: '>=' | '<=') => (value: string | string[]) =>
  integer(value) !== null ? `${field}${operator}${integer(value)}` : null;

/**
 * Filters of the race list (spec 059), kept in the URL. The name is matched on the client against the translated
 * name and the source (spec 063: no RSQL, the races are loaded whole); the rest go to the API as RSQL.
 */
export const raceFilters = (t: TFunction, realms: Realm[] | undefined): FilterSchema<Race> => ({
  q: {
    kind: 'text',
    label: t('name'),
    match: (race, value) => normalizeText(raceName(race, t)).includes(normalizeText(String(value).trim())),
  },
  archetype: {
    kind: 'multiple',
    label: t('archetype'),
    format: (value) => archetypeLabel(value, t),
    toRsql: (value) => {
      const keys = list(value).map(raceArchetypeKey).filter(Boolean);
      return keys.length ? `archetype=in=(${keys.join(',')})` : null;
    },
  },
  size: {
    kind: 'multiple',
    label: t('size'),
    options: CREATURE_SIZES,
    format: (value) => t(`size-${value}`),
    toRsql: (value) => `sizeId=in=(${list(value).join(',')})`,
  },
  access: {
    kind: 'single',
    label: t('access-type'),
    options: RACE_ACCESS_TYPES,
    format: (value) => t(value),
    toRsql: (value) => `accessType==${value}`,
  },
  hitsMin: { kind: 'text', label: t('race-hits-min'), toRsql: range('baseHits', '>=') },
  hitsMax: { kind: 'text', label: t('race-hits-max'), toRsql: range('baseHits', '<=') },
  dpMin: { kind: 'text', label: t('race-dp-min'), toRsql: range('baseDevPoints', '>=') },
  dpMax: { kind: 'text', label: t('race-dp-max'), toRsql: range('baseDevPoints', '<=') },
  realm: {
    kind: 'single',
    label: t('realm'),
    format: (value) => realmName(realms, value),
    toRsql: (value) => `realmId==${value}`,
  },
  source: { ...entitySourceFilter<Race>(t), toRsql: undefined },
});

/** Sections of the side panel of the race list. `archetypes` are the archetype keys to offer. */
export default function RaceListFilters({
  filters,
  realms,
  archetypes,
}: {
  filters: ListFilters<Race>;
  realms: Realm[] | undefined;
  archetypes: string[];
}) {
  const { t } = useTranslation();
  const single = (key: string) => ({
    value: filters.get(key) || null,
    onChange: (id: string | null) => filters.set(key, id),
    allowAll: true,
  });
  const multiple = (key: string) => ({
    mode: 'multiple' as const,
    value: filters.getAll(key),
    onChange: (ids: string[]) => filters.set(key, ids),
  });
  const numberInput = (key: string, max: number) => ({
    value: integer(filters.get(key)),
    onChange: (value: number | null) => filters.set(key, value === null ? '' : String(value)),
    integer: true,
    min: 0,
    max,
  });
  // Built outside the JSX: the i18n lint reads string arguments there as visible text.
  const bind = {
    archetype: multiple('archetype'),
    size: multiple('size'),
    access: single('access'),
    realm: single('realm'),
    source: single('source'),
    hitsMin: numberInput('hitsMin', 999),
    hitsMax: numberInput('hitsMax', 999),
    dpMin: numberInput('dpMin', 999),
    dpMax: numberInput('dpMax', 999),
  };

  return (
    <>
      <FilterSection title={t('search')} collapsible={false}>
        <FilterSearchField filters={filters} filter="q" label={t('name')} />
      </FilterSection>
      <FilterSection title={t('race')}>
        <EnumPicker
          {...bind.archetype}
          variant="select"
          label={t('archetype')}
          values={archetypes}
          formatLabel={(value) => archetypeLabel(value, t)}
        />
        <EnumPicker {...bind.size} variant="select" label={t('size')} values={CREATURE_SIZES} labelPrefix="size-" />
        <EnumPicker {...bind.access} label={t('access-type')} values={RACE_ACCESS_TYPES} />
        <EnumPicker {...bind.source} label={t('entity-source')} values={ENTITY_SOURCES} labelPrefix="entity-source-" />
        <Stack direction="row" spacing={1}>
          <NumericInput {...bind.hitsMin} name="hitsMin" label={t('race-hits-min')} />
          <NumericInput {...bind.hitsMax} name="hitsMax" label={t('race-hits-max')} />
        </Stack>
        <Stack direction="row" spacing={1}>
          <NumericInput {...bind.dpMin} name="dpMin" label={t('race-dp-min')} />
          <NumericInput {...bind.dpMax} name="dpMax" label={t('race-dp-max')} />
        </Stack>
      </FilterSection>
      <FilterSection title={t('realm')}>
        <RealmPicker {...bind.realm} realms={realms} variant="select" />
      </FilterSection>
    </>
  );
}
