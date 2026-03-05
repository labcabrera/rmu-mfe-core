import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { Race } from '../../api/race.dto';
import { imageBaseUrl } from '../../services/config';
import RmuTextCard from '../../shared/cards/RmuTextCard';

const RaceViewTraits: FC<{
  race: Race;
}> = ({ race }) => {
  return (
    <>
      <Grid container spacing={1} columns={10}>
        {race.traits.map((trait, index) => (
          <Grid size={{ xs: 5, md: 3 }} key={`trait-${index}`}>
            <RmuTextCard
              value={t(trait.traitId)}
              subtitle={t('trait')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
            />
          </Grid>
        ))}
        {race.traits.length === 0 && (
          <Grid size={12}>
            <Typography variant="body1" color="textSecondary">
              Race has no traits.
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default RaceViewTraits;
