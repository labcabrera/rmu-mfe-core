import React from 'react';
import { useTranslation } from 'react-i18next';
import { FilterBar, FilterSchema, Realm, RealmPicker } from '@labcabrera-rmu/rmu-react-shared-lib';
import { TFunction } from 'i18next';
import { bindSingle, equalsFilter, FilterAccess, FilterTextField, realmName, regexFilter } from './list-filters';

/**
 * Filters of the race and culture lists: name and realm. `realmField` is the RSQL field of the realm id: `realmId` for
 * races, `realm.id` for cultures.
 */
export const nameRealmSchema = <T,>(
  t: TFunction,
  realms: Realm[] | undefined,
  realmField = 'realmId'
): FilterSchema<T> => ({
  q: regexFilter<T>(t('name'), 'name'),
  realm: equalsFilter<T>(t('realm'), realmField, { format: (id) => realmName(realms, id) }),
});

/** Name and realm filters of the race and culture lists, bound to their useListFilters state. */
export default function NameRealmFilters({ filters, realms }: { filters: FilterAccess; realms: Realm[] | undefined }) {
  const { t } = useTranslation();
  const realm = bindSingle(filters, 'realm');
  return (
    <FilterBar>
      <FilterTextField filters={filters} filter="q" label={t('name')} />
      <RealmPicker {...realm} realms={realms} variant="select" />
    </FilterBar>
  );
}
