/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { fetchTraits, RmuPagination, RmuTextCard, Trait } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { gridSizeResume, gridSizeMain, gridSizeCard } from '../../services/display';
import { getTraitImage } from '../../services/trait-image-service';
import TraitListActions from './TraitListActions';
import TraitListSearch from './TraitListSearch';
import { useAuth } from 'react-oidc-context';

const TraitList: FC = () => {
  const auth = useAuth();
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
    <Grid container spacing={1}>
      <Grid size={gridSizeResume}></Grid>
      <Grid size={gridSizeMain}>
        <TraitListActions onRefresh={bindTraits} />
        <Grid container spacing={1}>
          <Grid size={12}>
            <TraitListSearch setSearchString={setSearchString} />
          </Grid>
          <Grid size={12}>
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
          </Grid>
          <Grid size={12}>
            <RmuPagination
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalPages={totalPages}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TraitList;
