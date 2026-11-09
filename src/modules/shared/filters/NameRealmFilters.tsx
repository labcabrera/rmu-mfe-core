import { useTranslation } from 'react-i18next';
import {
  bindSingle,
  equalsFilter,
  FilterAccess,
  FilterSchema,
  FilterSearchField,
  FilterSection,
  normalizeText,
  Realm,
  RealmPicker,
  realmName,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { TFunction } from 'i18next';

/**
 * Filters of the culture list: the translated name (`nameOf`), matched on the client, and the realm. `realmField` is
 * the RSQL field of the realm id: `realmId` for races, `realm.id` for cultures.
 */
export const nameRealmSchema = <T,>(
  t: TFunction,
  realms: Realm[] | undefined,
  nameOf: (entity: T) => string,
  realmField = 'realmId'
): FilterSchema<T> => ({
  q: {
    kind: 'text',
    label: t('name'),
    match: (entity, value) => normalizeText(nameOf(entity)).includes(normalizeText(String(value).trim())),
  },
  realm: equalsFilter<T>(t('realm'), realmField, { format: (id) => realmName(realms, id) }),
});

/** Name and realm sections of the side filter panel (spec 066, decision 14), bound to their useListFilters state. */
export default function NameRealmFilters({ filters, realms }: { filters: FilterAccess; realms: Realm[] | undefined }) {
  const { t } = useTranslation();
  const realm = bindSingle(filters, 'realm');
  return (
    <>
      <FilterSection title={t('search')} collapsible={false}>
        <FilterSearchField filters={filters} filter="q" label={t('name')} />
      </FilterSection>
      <FilterSection title={t('realm')}>
        <RealmPicker {...realm} realms={realms} variant="select" />
      </FilterSection>
    </>
  );
}
