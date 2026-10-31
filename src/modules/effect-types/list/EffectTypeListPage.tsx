import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  defaultImages,
  EffectType,
  effectPropertyRequirements,
  EntityCard,
  EntityPicker,
  EnumPicker,
  FilterBar,
  fetchEffectTypes,
  ListPage,
  useListFilters,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { bindSingle, equalsFilter, FilterTextField, regexFilter } from '../../shared/filters/list-filters';

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
      filters={
        <FilterBar>
          <FilterTextField filters={filters} filter="q" label={t('id')} />
          <EntityPicker
            {...persistent}
            variant="select"
            hideImages
            label={t('is-persistent')}
            options={BOOLEANS.map((id) => ({ id, label: t(booleanLabel(id)) }))}
          />
          <EnumPicker {...value} variant="select" label={t('value')} values={effectPropertyRequirements} />
        </FilterBar>
      }
      filterState={filters}
      collection={{ modes: ['cards'], storageKey: 'core.effect-types' }}
      renderItem={(effectType) => (
        <EntityCard
          title={t(effectType.id)}
          subtitle={`${t(effectType.isPersistent ? 'persistent' : 'instant')} • ${t(effectType.value)}`}
          image={defaultImages.generic}
          onClick={() => navigate(`/core/effect-types/view/${effectType.id}`, { state: { effectType } })}
        />
      )}
    />
  );
}
