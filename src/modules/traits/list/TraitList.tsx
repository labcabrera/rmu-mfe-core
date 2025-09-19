import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Link, Pagination, Box, Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchPagedTraits } from '../../api/trait';
import { Trait } from '../../api/trait.dto';
import TraitCard from '../../shared/cards/trait-card';
import TraitListActions from './TraitListActions';
import TraitListSearch from './TraitListSearch';

const PAGE_SIZE = 24;

const TraitList: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const [traits, setTraits] = useState<Trait[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchId, setSearchId] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('');

  const bindTraits = (id: string, category: string, type: string, pageNumber: number = 0) => {
    let query = '';
    if (id) query += `id=re=${id}`;
    if (category && category !== 'all') {
      if (query !== '') query += ';';
      query += `category==${category}`;
    }
    if (type && type !== 'all') {
      console.log(type);
      if (query !== '') query += ';';
      query += `isTalent==${type === 'talent'}`;
    }
    fetchPagedTraits(query, pageNumber, PAGE_SIZE)
      .then((response) => {
        setTraits(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('An unknown error occurred');
      });
  };

  const handleNewTrait = () => {
    navigate('/core/traits/create');
  };

  const handleSearch = (id: string, category: string, type: string) => {
    setSearchId(id);
    setSearchCategory(category);
    setSearchType(type);
    setPage(0);
    bindTraits(id, category, type, 0);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
    bindTraits(searchId, searchCategory, searchType, value - 1);
  };

  useEffect(() => {
    bindTraits('', '', '', 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TraitListActions />
      <TraitListSearch onSearch={handleSearch} />
      <Grid container spacing={2} mb={2} alignItems="center">
        <Grid size={8}>
          <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
            {traits.map((trait) => (
              <TraitCard key={trait.id} trait={trait} />
            ))}
          </Box>
        </Grid>
      </Grid>
      {traits.length === 0 ? (
        <p>
          No traits found.{' '}
          <Link component="button" onClick={handleNewTrait}>
            {t('create-new')}
          </Link>
        </p>
      ) : null}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
      </Box>
    </>
  );
};

export default TraitList;
