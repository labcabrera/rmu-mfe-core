import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { imageBaseUrl } from './modules/services/config';
import RmuBreadcrumbs from './modules/shared/breadcrumbs/RmuBreadcrumbs';
import RmuTextCard from './modules/shared/cards/RmuTextCard';

const HomePage: FC = () => {
  const navigate = useNavigate();
  const cards = [
    {
      value: 'Realms',
      subtitle: 'Manage realms',
      image: `${imageBaseUrl}images/generic/realm.png`,
      to: '/core/realms',
    },
    {
      value: 'Races',
      subtitle: 'Manage races',
      image: `${imageBaseUrl}images/generic/races.png`,
      to: '/core/races',
    },
    {
      value: 'Traits',
      subtitle: 'Manage traits',
      image: `${imageBaseUrl}images/generic/trait.png`,
      to: '/core/traits',
    },
    {
      value: 'Languages',
      subtitle: 'Manage languages',
      image: `${imageBaseUrl}images/generic/language.png`,
      to: '/core/languages',
    },
    {
      value: 'Maneuvers',
      subtitle: 'Maneuvers',
      image: `${imageBaseUrl}images/generic/configuration.png`,
      to: '/core/maneuvers',
    },
    {
      value: 'Skill categories',
      subtitle: 'Skill category reference',
      image: `${imageBaseUrl}images/generic/configuration.png`,
      to: '/core/skill-categories',
    },
    {
      value: 'Skills',
      subtitle: 'Skill reference',
      image: `${imageBaseUrl}images/generic/configuration.png`,
      to: '/core/skills',
    },
  ];

  return (
    <>
      <RmuBreadcrumbs items={[{ name: 'Core' }]} />
      <Grid container spacing={1}>
        {cards.map((c) => (
          <Grid size={{ xs: 12, md: 2 }} key={c.value}>
            <RmuTextCard value={c.value} subtitle={c.subtitle} image={c.image} onClick={() => navigate(c.to)} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomePage;
