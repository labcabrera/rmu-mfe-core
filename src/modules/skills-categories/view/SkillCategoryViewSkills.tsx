import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { AddButton, CategorySeparator, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { Skill } from '../../api/skill.dto';
import { defaultImage } from '../../services/image-service';

const SkillCategoryViewSkills: FC<{
  skills: Skill[];
}> = ({ skills }) => {
  const navigate = useNavigate();

  return (
    <>
      <Grid container spacing={1} mt={5}>
        <Grid size={12}>
          <CategorySeparator text={t('Skills')}>
            <AddButton onClick={() => navigate(`/core/skills/create`)} />
          </CategorySeparator>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={1}>
            {skills.map((skill) => (
              <Grid size={{ xs: 12, md: 3 }} key={skill.id}>
                <RmuTextCard
                  value={`${t(skill.id)}${skill.specialization ? ' *' : ''}`}
                  subtitle={t('skill')}
                  image={defaultImage}
                  onClick={() => navigate(`/core/skills/view/${skill.id}`, { state: { skill } })}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid size={12}>{skills.length === 0 ? <p>No skills found.</p> : null}</Grid>
      </Grid>
    </>
  );
};

export default SkillCategoryViewSkills;
