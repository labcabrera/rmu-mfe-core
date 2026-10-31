import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { EntityCard, gridSizeShowcase, imageBaseUrl, LayoutBase } from '@labcabrera-rmu/rmu-react-shared-lib';

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
    image: `${imageBaseUrl}images/generic/traits.png`,
    to: '/core/traits',
  },
  {
    value: 'effect-types',
    subtitle: 'manage-effect-types',
    image: `${imageBaseUrl}images/generic/effect-types.png`,
    to: '/core/effect-types',
  },
  {
    value: 'catalogs',
    subtitle: 'manage-catalogs',
    image: `${imageBaseUrl}images/generic/language.png`,
    to: '/core/catalogs',
  },
  {
    value: 'fighting-styles',
    subtitle: 'browse-fighting-styles',
    image: `${imageBaseUrl}images/generic/trait-combat.png`,
    to: '/core/fighting-styles',
  },
  {
    value: 'maneuvers',
    subtitle: 'execute-maneuvers',
    image: `${imageBaseUrl}images/generic/maneuvers.png`,
    to: '/core/maneuvers',
  },
  {
    value: 'attack-tables',
    subtitle: 'browse-attack-tables',
    image: `${imageBaseUrl}images/generic/warrior.png`,
    to: '/core/attack-tables',
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
      <Grid container spacing={2}>
        {OPTIONS.map((c) => (
          <Grid size={gridSizeShowcase} key={c.value}>
            <EntityCard title={t(c.value)} description={t(c.subtitle)} image={c.image} onClick={() => navigate(c.to)} />
          </Grid>
        ))}
      </Grid>
    </LayoutBase>
  );
};

export default HomePage;
