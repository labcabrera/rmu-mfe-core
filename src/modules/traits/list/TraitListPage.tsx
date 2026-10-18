import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  FilterBar,
  fetchTraits,
  ListPage,
  RmuTextCard,
  rsqlAnd,
  SearchField,
  Trait,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { getTraitImage } from '../../services/trait-image-service';
import SelectTraitCategory from '../../shared/selects/SelectTraitCategory';
import SelectTraitType from '../../shared/selects/SelectTraitType';

const valueOrUndefined = (value: string | undefined) => (value && value !== 'all' ? value : undefined);

export default function TraitListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const traitType = valueOrUndefined(type);
  const query = usePagedQuery<Trait>({
    fetcher: (q, page, size) => fetchTraits(q, page, size, auth),
    rsql: rsqlAnd([
      ['id=re=', name],
      ['category==', valueOrUndefined(category)],
      ['isTalent==', traitType && String(traitType === 'talent')],
    ]),
    onError: notify.error,
  });

  const getTraitSubtitle = (trait: Trait): string =>
    `${t(trait.isTalent ? t('trait') : t('flaw'))} • ${trait.category} • ${trait.adquisitionCost}`;

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('traits') }]}
      query={query}
      onAdd={() => navigate('/core/traits/create')}
      filters={
        <FilterBar>
          <SearchField value={name} onChange={setName} />
          <SelectTraitCategory
            value={category}
            onChange={(value) => setCategory(value || '')}
            addAllOption
            label={t('category')}
            name="category"
          />
          <SelectTraitType
            value={type}
            onChange={(e) => setType(e.target.value || '')}
            addAllOption
            label={t('trait-type')}
            name="trait-type"
          />
        </FilterBar>
      }
      renderItem={(trait) => (
        <RmuTextCard
          value={`${t(trait.name)}${trait.isTierBased ? ' *' : ''}`}
          subtitle={getTraitSubtitle(trait)}
          image={getTraitImage(trait)}
          onClick={() => navigate(`/core/traits/view/${trait.id}`, { state: { trait } })}
          grayscale={trait.isTalent ? 0 : 0.8}
        />
      )}
    />
  );
}
