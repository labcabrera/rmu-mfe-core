import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import { t } from 'i18next';
import { Skill } from '../../api/skill.dto';
import { imageBaseUrl } from '../../services/config';
import CardListItem from '../../shared/cards/CardListItem';

const SkillCategoryViewSkills: FC<{
  skills: Skill[];
}> = ({ skills }) => {
  const navigate = useNavigate();

  const handleSkillClick = async (skill: Skill) => {
    navigate(`/core/skills/view/${skill.id}`, { state: { skill } });
  };

  return (
    <>
      <Grid container spacing={1} mt={1} mb={1} alignItems="center">
        <Grid size={12}>
          <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
            {skills.map((skill) => (
              <CardListItem
                key={skill.id}
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
    </>
  );
};

export default SkillCategoryViewSkills;
