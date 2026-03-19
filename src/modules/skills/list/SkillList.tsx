import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Box, Grid } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchSkills } from '../../api/skill';
import { fetchSkillCategories } from '../../api/skill-category';
import { SkillCategory } from '../../api/skill-category.dto';
import { Skill } from '../../api/skill.dto';
import { imageBaseUrl } from '../../services/config';
import RmuTextCard from '../../shared/cards/RmuTextCard';
import SkillListActions from './SkillListActions';
import SkillListSearch from './SkillListSearch';

const PAGE_SIZE = 24;

const SkillList: FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [queryString, setQueryString] = useState<string>('');

  const bindSkills = (queryString: string, pageNumber: number = 0) => {
    fetchSkills(queryString, pageNumber, PAGE_SIZE)
      .then((response) => {
        setSkills(response.content);
        setTotalPages(response.pagination.totalPages || 1);
      })
      .catch((err: Error) => showError(err.message));
  };

  const bindSkillCategories = () => {
    fetchSkillCategories()
      .then((data) => setSkillCategories(data))
      .catch((err: Error) => showError(err.message));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  useEffect(() => {
    bindSkills(queryString, page);
    bindSkillCategories();
  }, [queryString, page]);

  if (!skills) return <p>Loading...</p>;

  return (
    <>
      <SkillListActions />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <SkillListSearch setQueryString={setQueryString} categories={skillCategories} />
            </Grid>
            {skills.map((skill) => (
              <Grid size={{ xs: 12, md: 3 }} key={skill.id}>
                <RmuTextCard
                  value={`${t(skill.id)}${skill.specialization ? ' *' : ''}`}
                  subtitle={t(skill.categoryId)}
                  image={`${imageBaseUrl}images/generic/configuration.png`}
                  onClick={() => navigate(`/core/skills/view/${skill.id}`, { state: { skill } })}
                />
              </Grid>
            ))}
          </Grid>
          {skills.length === 0 ? <p>No skills found.</p> : null}
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SkillList;
