import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  defaultImages,
  EntityCard,
  EnumPicker,
  fetchTraits,
  FilterSection,
  ListPage,
  Trait,
  traitCategories,
  useListFilters,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { traitCategoryImage } from '../../services/trait-image-service';
import { TRAIT_TYPES } from '../../shared/enums';
import { bindSingle, equalsFilter, FilterTextField, regexFilter } from '../../shared/filters/list-filters';

/** Traits catalog (spec 046): filters in the side panel, kept in the URL. */
export default function TraitListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const filters = useListFilters<Trait>({
    q: regexFilter(t('name'), 'id'),
    category: equalsFilter(t('category'), 'category', { options: traitCategories, format: (value) => t(value) }),
    type: {
      kind: 'single',
      label: t('trait-type'),
      options: TRAIT_TYPES,
      format: (value) => t(value),
      toRsql: (value) => (value ? `isTalent==${value === 'talent'}` : undefined),
    },
  });
  const query = usePagedQuery<Trait>({
    fetcher: (q, page, size) => fetchTraits(q, page, size, auth),
    rsql: filters.rsql,
    onError: notify.error,
  });
  const category = bindSingle(filters, 'category');
  const type = bindSingle(filters, 'type');

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('traits') }]}
      query={query}
      onAdd={() => navigate('/core/traits/create')}
      filtersLayout="side"
      filterState={filters}
      filtersStorageKey="core.traits"
      filters={
        <>
          <FilterSection title={t('search')} collapsible={false}>
            <FilterTextField filters={filters} filter="q" label={t('name')} />
          </FilterSection>
          <FilterSection title={t('trait-type')}>
            <EnumPicker {...type} variant="tiles" label={t('trait-type')} values={TRAIT_TYPES} />
          </FilterSection>
          <FilterSection title={t('category')}>
            <EnumPicker
              {...category}
              variant="tiles"
              label={t('category')}
              values={traitCategories}
              images={traitCategoryImage}
              kind="trait"
            />
          </FilterSection>
        </>
      }
      collection={{ modes: ['cards'], storageKey: 'core.traits' }}
      renderItem={(trait) => (
        <EntityCard
          title={`${t(trait.name)}${trait.isTierBased ? ' *' : ''}`}
          subtitle={`${t(trait.isTalent ? 'trait' : 'flaw')} • ${t(trait.category)}`}
          image={traitCategoryImage(trait.category)}
          fallbackImages={[defaultImages.trait]}
          imageFilter={trait.isTalent ? undefined : 'grayscale(0.8)'}
          metrics={[{ label: t('adquisition-cost'), value: trait.adquisitionCost }]}
          onClick={() => navigate(`/core/traits/view/${trait.id}`, { state: { trait } })}
        />
      )}
    />
  );
}
