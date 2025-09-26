import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Stack } from '@mui/material';
import { t } from 'i18next';
import { Skill } from '../../api/skill.dto';

const SkillViewActions: FC<{
  skill: Skill;
}> = ({ skill }) => {
  if (!skill) return <p>Loading...</p>;

  return (
    <>
      <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" underline="hover" href="/">
              {t('home')}
            </Link>
            <Link component={RouterLink} color="primary" underline="hover" to="/core/">
              {t('core')}
            </Link>
            <Link component={RouterLink} color="primary" underline="hover" to="/core/skills">
              {t('skills')}
            </Link>
            <span>{t(skill.id)}</span>
          </Breadcrumbs>
        </Box>
      </Stack>
    </>
  );
};

export default SkillViewActions;
