import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { MenuItem, TextField } from '@mui/material';
import {
  EffectType,
  effectPropertyRequirements,
  FilterBar,
  fetchEffectTypes,
  imageBaseUrl,
  ListPage,
  RmuTextCard,
  rsqlAnd,
  SearchField,
  useNotify,
  usePagedQuery,
} from '@labcabrera-rmu/rmu-react-shared-lib';

const valueOrUndefined = (value: string) => (value !== 'all' ? value : undefined);

export default function EffectTypeListPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const [id, setId] = useState('');
  const [isPersistent, setIsPersistent] = useState('all');
  const [valueRequirement, setValueRequirement] = useState('all');
  const query = usePagedQuery<EffectType>({
    fetcher: (q, page, size) => fetchEffectTypes(q, page, size, auth),
    rsql: rsqlAnd([
      ['id=re=', id],
      ['isPersistent==', valueOrUndefined(isPersistent)],
      ['value==', valueOrUndefined(valueRequirement)],
    ]),
    onError: notify.error,
  });

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('effect-types') }]}
      query={query}
      onAdd={() => navigate('/core/effect-types/create')}
      filters={
        <FilterBar>
          <SearchField value={id} onChange={setId} label={t('id')} name="id" />
          <TextField
            select
            label={t('is-persistent')}
            value={isPersistent}
            onChange={(e) => setIsPersistent(e.target.value)}
            fullWidth
          >
            <MenuItem value="all">{t('all')}</MenuItem>
            <MenuItem value="true">{t('yes')}</MenuItem>
            <MenuItem value="false">{t('no')}</MenuItem>
          </TextField>
          <TextField
            select
            label={t('value')}
            value={valueRequirement}
            onChange={(e) => setValueRequirement(e.target.value)}
            fullWidth
          >
            <MenuItem value="all">{t('all')}</MenuItem>
            {effectPropertyRequirements.map((requirement) => (
              <MenuItem key={requirement} value={requirement}>
                {t(requirement)}
              </MenuItem>
            ))}
          </TextField>
        </FilterBar>
      }
      renderItem={(effectType) => (
        <RmuTextCard
          value={t(effectType.id)}
          subtitle={`${t(effectType.isPersistent ? 'persistent' : 'instant')} • ${t(effectType.value)}`}
          image={`${imageBaseUrl}images/generic/configuration.png`}
          onClick={() => navigate(`/core/effect-types/view/${effectType.id}`, { state: { effectType } })}
        />
      )}
    />
  );
}
