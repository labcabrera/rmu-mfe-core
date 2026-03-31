import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { RmuBreadcrumbs, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { imageBaseUrl } from './modules/services/config';
import { gridSizeResume, gridSizeMain, gridSizeCard } from './modules/services/display';

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
      value: 'Professions',
      subtitle: 'Manage professions',
      image: `${imageBaseUrl}images/generic/configuration.png`,
      to: '/core/professions',
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
    {
      value: 'Traits',
      subtitle: 'Manage traits',
      image: `${imageBaseUrl}images/generic/trait.png`,
      to: '/core/traits',
    },
    {
      value: 'Catalogs',
      subtitle: 'Manage catalogs',
      image: `${imageBaseUrl}images/generic/language.png`,
      to: '/core/catalogs',
    },
    {
      value: 'Maneuvers',
      subtitle: 'Maneuvers',
      image: `${imageBaseUrl}images/generic/configuration.png`,
      to: '/core/maneuvers',
    },
    {
      value: 'Resistance rolls',
      subtitle: 'Resistance rolls',
      image: `${imageBaseUrl}images/generic/configuration.png`,
      to: '/core/resistance-rolls',
    },
  ];

  return (
    <>
      <RmuBreadcrumbs items={[{ name: 'Core' }]} />
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <Grid container spacing={1}>
            {cards.map((c) => (
              <Grid size={gridSizeCard} key={c.value}>
                <RmuTextCard value={c.value} subtitle={c.subtitle} image={c.image} onClick={() => navigate(c.to)} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
