import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { LayoutBase, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { imageBaseUrl } from './modules/services/config';
import { gridSizeCard } from './modules/services/display';

const OPTIONS = [
  {
    value: 'realms',
    subtitle: 'manage-realms',
    image: `${imageBaseUrl}images/generic/realm.png`,
    to: '/core/realms',
  },
  {
    value: 'races',
    subtitle: 'manage-races',
    image: `${imageBaseUrl}images/generic/races.png`,
    to: '/core/races',
  },
  {
    value: 'professions',
    subtitle: 'manage-professions',
    image: `${imageBaseUrl}images/generic/professions.png`,
    to: '/core/professions',
  },
  {
    value: 'cultures',
    subtitle: 'manage-cultures',
    image: `${imageBaseUrl}images/generic/cultures.png`,
    to: '/core/cultures',
  },
  {
    value: 'skill-categories',
    subtitle: 'manage-skill-categories',
    image: `${imageBaseUrl}images/generic/skills.png`,
    to: '/core/skill-categories',
  },
  {
    value: 'skills',
    subtitle: 'manage-skills',
    image: `${imageBaseUrl}images/generic/skills.png`,
    to: '/core/skills',
  },
  {
    value: 'traits',
    subtitle: 'manage-traits',
    image: `${imageBaseUrl}images/generic/trait.png`,
    to: '/core/traits',
  },
  {
    value: 'catalogs',
    subtitle: 'manage-catalogs',
    image: `${imageBaseUrl}images/generic/language.png`,
    to: '/core/catalogs',
  },
  {
    value: 'maneuvers',
    subtitle: 'execute-maneuvers',
    image: `${imageBaseUrl}images/generic/maneuver-penalty.png`,
    to: '/core/maneuvers',
  },
  {
    value: 'resistance-rolls',
    subtitle: 'execute-resistance-rolls',
    image: `${imageBaseUrl}images/generic/poison.png`,
    to: '/core/resistance-rolls',
  },
];

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <LayoutBase breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core') }]}>
      <Grid container spacing={1}>
        {OPTIONS.map((c) => (
          <Grid size={gridSizeCard} key={c.value}>
            <RmuTextCard value={t(c.value)} subtitle={t(c.subtitle)} image={c.image} onClick={() => navigate(c.to)} />
          </Grid>
        ))}
      </Grid>
    </LayoutBase>
  );
};

export default HomePage;
