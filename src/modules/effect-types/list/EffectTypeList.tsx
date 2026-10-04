import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import {
  AddButton,
  EffectType,
  fetchEffectTypes,
  LayoutBase,
  RefreshButton,
  RmuPagination,
  RmuTextCard,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import { gridSizeCard } from '../../services/display';
import EffectTypeListSearch from './EffectTypeListSearch';

export default function EffectTypeList() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const [effectTypes, setEffectTypes] = useState<EffectType[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState<number>(24);
  const [searchString, setSearchString] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const bindEffectTypes = () => {
    fetchEffectTypes(searchString, page, pageSize, auth)
      .then((response) => {
        setEffectTypes(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    bindEffectTypes();
  }, [searchString, page, pageSize]);

  return (
    <LayoutBase
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('effect-types') }]}
      actions={[
        <RefreshButton onClick={() => bindEffectTypes()} />,
        <AddButton onClick={() => navigate('/core/effect-types/create')} />,
      ]}
    >
      <EffectTypeListSearch setSearchString={setSearchString} />
      <Grid container spacing={1} sx={{ mt: 2 }}>
        {effectTypes.map((effectType) => (
          <Grid size={gridSizeCard} key={effectType.id}>
            <RmuTextCard
              value={t(effectType.id)}
              subtitle={`${t(effectType.isPersistent ? 'persistent' : 'instant')} • ${t(effectType.value)}`}
              image={`${imageBaseUrl}images/generic/configuration.png`}
              onClick={() => navigate(`/core/effect-types/view/${effectType.id}`, { state: { effectType } })}
            />
          </Grid>
        ))}
        {effectTypes.length === 0 ? <p>No effect types found.</p> : null}
      </Grid>
      <RmuPagination
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={totalPages}
      />
    </LayoutBase>
  );
}
