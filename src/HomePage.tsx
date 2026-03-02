import React, { FC } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Breadcrumbs, Grid, Link, Stack } from '@mui/material';
import { t } from 'i18next';
import { imageBaseUrl } from './modules/services/config';
import CardListItem from './modules/shared/cards/CardListItem';

const HomePage: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Stack
        spacing={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
        sx={{ minHeight: 60 }}
      >
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} color="primary" underline="always" to="/core">
              {t('core')}
            </Link>
          </Breadcrumbs>
        </Box>
      </Stack>
      <Grid container spacing={2} direction="column">
        <Grid size={12}>
          <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
            <CardListItem
              title="Realms"
              subtitle="Manage realms"
              image={`${imageBaseUrl}images/generic/realm.png`}
              onClick={() => navigate(`/core/realms`)}
            />
            <CardListItem
              title="Races"
              subtitle="Manage races"
              image={`${imageBaseUrl}images/generic/races.png`}
              onClick={() => navigate(`/core/races`)}
            />
            <CardListItem
              title="Traits"
              subtitle="Manage traits"
              image={`${imageBaseUrl}images/generic/trait.png`}
              onClick={() => navigate(`/core/traits`)}
            />
            <CardListItem
              title="Languages"
              subtitle="Manage languages"
              image={`${imageBaseUrl}images/generic/language.png`}
              onClick={() => navigate(`/core/languages`)}
            />
            <CardListItem
              title="Maneuvers"
              subtitle="Maneuvers"
              image={`${imageBaseUrl}images/generic/configuration.png`}
              onClick={() => navigate(`/core/maneuvers`)}
            />
            <CardListItem
              title="Skills"
              subtitle="Skill consultation"
              image={`${imageBaseUrl}images/generic/configuration.png`}
              onClick={() => navigate(`/core/skills`)}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
