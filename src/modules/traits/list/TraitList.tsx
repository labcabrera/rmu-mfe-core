/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import {
  AddButton,
  fetchTraits,
  LayoutBase,
  RefreshButton,
  RmuPagination,
  RmuTextCard,
  Trait,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { gridSizeCard } from '../../services/display';
import { getTraitImage } from '../../services/trait-image-service';
import TraitListSearch from './TraitListSearch';

export default function TraitList() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const [traits, setTraits] = useState<Trait[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState<number>(24);
  const [searchString, setSearchString] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const bindTraits = () => {
    fetchTraits(searchString, page, pageSize, auth)
      .then((response) => {
        setTraits(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    bindTraits();
  }, [searchString, page, pageSize]);

  const getTraitSubtitle = (trait: Trait): string => {
    return `${t(trait.isTalent ? t('trait') : t('flaw'))} • ${trait.category} • ${trait.adquisitionCost}`;
  };

  return (
    <LayoutBase
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('traits') }]}
      actions={[
        <RefreshButton onClick={() => bindTraits()} />,
        <AddButton onClick={() => navigate('/core/traits/create')} />,
      ]}
    >
      <TraitListSearch setSearchString={setSearchString} />
      <Grid container spacing={1}>
        {traits.map((trait) => (
          <Grid size={gridSizeCard} key={trait.id}>
            <RmuTextCard
              value={`${t(trait.name)}${trait.isTierBased ? ' *' : ''}`}
              subtitle={getTraitSubtitle(trait)}
              image={getTraitImage(trait)}
              onClick={() => navigate(`/core/traits/view/${trait.id}`, { state: { trait } })}
              grayscale={trait.isTalent ? 0 : 0.8}
            />
          </Grid>
        ))}
        {traits.length === 0 ? <p>No traits found.</p> : null}
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
