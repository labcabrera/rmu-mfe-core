import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  bindSingle,
  defaultImages,
  effectPropertyRequirements,
  EffectType,
  EntityCard,
  EntityPicker,
  EntitySourceChip,
  EnumPicker,
  equalsFilter,
  fetchEffectTypes,
  FilterSearchField,
  FilterSection,
  ListPage,
  regexFilter,
  useListFilters,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';

const BOOLEANS = ['true', 'false'];
const booleanLabel = (value: string) => (value === 'true' ? 'yes' : 'no');

export default function EffectTypeListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const filters = useListFilters<EffectType>({
    q: regexFilter(t('id'), 'id'),
    persistent: equalsFilter(t('is-persistent'), 'isPersistent', {
      options: BOOLEANS,
      format: (value) => t(booleanLabel(value)),
    }),
    value: equalsFilter(t('value'), 'value', { options: effectPropertyRequirements, format: (value) => t(value) }),
  });
  const query = usePagedQuery<EffectType>({
    fetcher: (q, page, size) => fetchEffectTypes(q, page, size, auth),
    rsql: filters.rsql,
    onError: notify.error,
  });
  const persistent = bindSingle(filters, 'persistent');
  const value = bindSingle(filters, 'value');

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('effect-types') }]}
      query={query}
      onAdd={() => navigate('/core/effect-types/create')}
      filtersLayout="side"
      filterState={filters}
      filtersStorageKey="core.effect-types"
      filters={
        <>
          <FilterSection title={t('search')} collapsible={false}>
            <FilterSearchField filters={filters} filter="q" label={t('id')} />
          </FilterSection>
          <FilterSection title={t('is-persistent')}>
            <EntityPicker
              {...persistent}
              variant="select"
              hideImages
              label={t('is-persistent')}
              options={BOOLEANS.map((id) => ({ id, label: t(booleanLabel(id)) }))}
            />
          </FilterSection>
          <FilterSection title={t('value')}>
            <EnumPicker {...value} variant="select" label={t('value')} values={effectPropertyRequirements} />
          </FilterSection>
        </>
      }
      collection={{ modes: ['cards'], storageKey: 'core.effect-types' }}
      renderItem={(effectType) => (
        <EntityCard
          title={t(effectType.id)}
          subtitle={`${t(effectType.isPersistent ? 'persistent' : 'instant')} • ${t(effectType.value)}`}
          image={defaultImages.generic}
          chips={<EntitySourceChip entity={effectType} />}
          onClick={() => navigate(`/core/effect-types/view/${effectType.id}`, { state: { effectType } })}
        />
      )}
    />
  );
}
