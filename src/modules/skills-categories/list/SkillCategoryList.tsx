import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Box, Grid } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchPagedSkillCategories } from '../../api/skill-category';
import { SkillCategory } from '../../api/skill-category.dto';
import { imageBaseUrl } from '../../services/config';
import CardListItem from '../../shared/cards/CardListItem';
import SkillCategoryListActions from './SkillCategoryListActions';
import SkillCategoryListSearch from './SkillCategoryListSearch';

const PAGE_SIZE = 24;

const SkillCategoryList: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [queryString, setQueryString] = useState<string>('');

  const bindSkillCategories = (id: string, category: string, pageNumber: number = 0) => {
    fetchPagedSkillCategories(queryString, pageNumber, PAGE_SIZE)
      .then((response) => {
        setSkillCategories(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err: Error) => showError(err.message));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  const handleSkillClick = async (category: SkillCategory) => {
    navigate(`/core/skill-categories/view/${category.id}`, { state: { category } });
  };

  useEffect(() => {
    bindSkillCategories('', '', 0);
  }, [queryString, page]);

  if (!skillCategories) return <p>Loading...</p>;

  return (
    <>
      <SkillCategoryListActions />
      <SkillCategoryListSearch queryString={queryString} setQueryString={setQueryString} />
      <Grid container spacing={1} mt={1} mb={1} alignItems="center">
        <Grid size={12}>
          <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
            {skillCategories.map((category) => (
              <CardListItem
                title={t(category.id)}
                subtitle={t(category.id)}
                image={`${imageBaseUrl}images/generic/configuration.png`}
                onClick={() => handleSkillClick(category)}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
      {skillCategories.length === 0 ? <p>No skill categories found.</p> : null}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
      </Box>
    </>
  );
};

export default SkillCategoryList;
