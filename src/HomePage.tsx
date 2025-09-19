import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Breadcrumbs, Grid, IconButton, Link, Stack, Typography } from '@mui/material';
import CardListItem from './modules/shared/cards/CardListItem';

const HomePage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ minHeight: 80 }}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              {t('home')}
            </Link>
            <Link component={RouterLink} color="inherit" to="/core">
              {t('core')}
            </Link>
          </Breadcrumbs>
        </Box>
      </Stack>
      <Grid container spacing={2} direction="column">
        <Grid size={8}>
          <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
            <CardListItem title="Realms" subtitle="Manage realms" image="/static/images/generic/realm.png" onClick={() => navigate(`/core/realms`)} />
            <CardListItem title="Races" subtitle="Manage races" image="/static/images/races/unknown.png" onClick={() => navigate(`/core/races`)} />
            <CardListItem title="Traits" subtitle="Manage traits" image="/static/images/generic/trait.png" onClick={() => navigate(`/core/traits`)} />
            <CardListItem
              title="Languages"
              subtitle="Manage languages"
              image="/static/images/generic/language.png"
              onClick={() => navigate(`/core/languages`)}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
