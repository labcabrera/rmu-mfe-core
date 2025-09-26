import React, { FC } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Percent } from '@mui/icons-material';
import { Box, Breadcrumbs, Grid, Link, Stack, Typography } from '@mui/material';
import { t } from 'i18next';
import CardListItem from '../shared/cards/CardListItem';
import AbsoluteManeuverView from './AbsoluteManeuverView';
import EnduranceManeuverView from './EnduranceManeuverView';
import PercentManeuverView from './PercentManeuverView';

const ManeuversView: FC = () => {
  return (
    <>
      <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="primary" underline="hover" href="/">
              {t('home')}
            </Link>
            <Link component={RouterLink} color="primary" underline="hover" to="/core">
              {t('core')}
            </Link>
            <span>{t('maneuvers')}</span>
          </Breadcrumbs>
        </Box>
      </Stack>
      <Grid container spacing={2} direction="column">
        <Grid size={12}>
          <Typography variant="h6" color="primary" gutterBottom>
            Percent maneuver
          </Typography>
          <PercentManeuverView />
        </Grid>
        <Grid size={12} mt={3}>
          <Typography variant="h6" color="primary" gutterBottom>
            Absolute maneuver
          </Typography>
          <AbsoluteManeuverView />
        </Grid>
        <Grid size={12} mt={3}>
          <Typography variant="h6" color="primary" gutterBottom>
            Endurance
          </Typography>
          <EnduranceManeuverView />
        </Grid>
      </Grid>
    </>
  );
};

export default ManeuversView;
