import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Stack } from '@mui/material';
import { t } from 'i18next';

const SkillListActions: FC = () => {
  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="primary" underline="hover" href="/">
            {t('home')}
          </Link>
          <Link component={RouterLink} color="primary" underline="hover" to="/core">
            {t('core')}
          </Link>
          <span>{t('skills')}</span>
        </Breadcrumbs>
      </Box>
    </Stack>
  );
};

export default SkillListActions;
