import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Box, Grid } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchPagedSkills } from '../../api/skill';
import { fetchSkillCategories } from '../../api/skill-category';
import { SkillCategory } from '../../api/skill-category.dto';
import { Skill } from '../../api/skill.dto';
import { imageBaseUrl } from '../../services/config';
import CardListItem from '../../shared/cards/CardListItem';
import SkillListActions from './SkillListActions';
import SkillListSearch from './SkillListSearch';

const PAGE_SIZE = 24;

const TraitList: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchId, setSearchId] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('');

  const bindSkills = (id: string, category: string, pageNumber: number = 0) => {
    let query = '';
    if (id) query += `id=re=${id}`;
    if (category && category !== 'all') {
      if (query !== '') query += ';';
      query += `categoryId==${category}`;
    }
    fetchPagedSkills(query, pageNumber, PAGE_SIZE)
      .then((response) => {
        setSkills(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('An unknown error occurred');
      });
  };

  const bindSkillCategories = () => {
    fetchSkillCategories()
      .then((data) => setSkillCategories(data))
      .catch(() => {
        showError('Failed to load skill categories');
      });
  };

  const handleSearch = (id: string, category: string) => {
    setSearchId(id);
    setSearchCategory(category);
    setPage(0);
    bindSkills(id, category, 0);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
    bindSkills(searchId, searchCategory, value - 1);
  };

  const handleSkillClick = async (skill: Skill) => {
    navigate(`/core/skills/view/${skill.id}`, { state: { skill } });
  };

  useEffect(() => {
    bindSkills('', '', 0);
    bindSkillCategories();
  }, []);

  if (!skills) return <p>Loading...</p>;

  return (
    <>
      <SkillListActions />
      <SkillListSearch categories={skillCategories} onSearch={handleSearch} />
      <Grid container spacing={1} mt={1} mb={1} alignItems="center">
        <Grid size={12}>
          <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
            {skills.map((skill) => (
              <CardListItem
                title={t(skill.id)}
                subtitle={t(skill.categoryId)}
                image={`${imageBaseUrl}images/generic/configuration.png`}
                onClick={() => handleSkillClick(skill)}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
      {skills.length === 0 ? <p>No skills found.</p> : null}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
      </Box>
    </>
  );
};

export default TraitList;
