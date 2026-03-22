import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Box, Grid } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchPagedTraits } from '../../api/trait';
import { Trait } from '../../api/trait.dto';
import { gridSizeResume, gridSizeMain, gridSizeCard } from '../../services/display';
import { getTraitImage } from '../../services/trait-image-service';
import RmuTextCard from '../../shared/cards/RmuTextCard';
import TraitListActions from './TraitListActions';
import TraitListSearch from './TraitListSearch';

const PAGE_SIZE = 24;

const TraitList: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [traits, setTraits] = useState<Trait[]>([]);
  const [page, setPage] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const bindTraits = () => {
    fetchPagedTraits(searchString, page, PAGE_SIZE)
      .then((response) => {
        setTraits(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('An unknown error occurred');
      });
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  useEffect(() => {
    bindTraits();
  }, [searchString, page]);

  return (
    <>
      <TraitListActions onRefresh={bindTraits} />
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <TraitListSearch setSearchString={setSearchString} />
          <Grid container spacing={1} mt={1}>
            {traits.map((trait) => (
              <Grid size={gridSizeCard} key={trait.id}>
                <RmuTextCard
                  value={`${t(trait.name)}${trait.isTierBased ? ' *' : ''}`}
                  subtitle={
                    t(trait.isTalent ? t('trait') : t('flaw')) +
                    ' • ' +
                    t(trait.category) +
                    ' • ' +
                    trait.adquisitionCost
                  }
                  image={getTraitImage(trait)}
                  onClick={() => navigate(`/core/traits/view/${trait.id}`, { state: { trait } })}
                  grayscale={trait.isTalent ? 0 : 0.8}
                />
              </Grid>
            ))}
          </Grid>
          {traits.length === 0 ? <p>No traits found.</p> : null}
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TraitList;
