import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { Race, RaceTrait } from '../../api/race.dto';
import { Trait } from '../../api/trait.dto';
import { imageBaseUrl } from '../../services/config';
import RmuTextCard from '../../shared/cards/RmuTextCard';
import ViewTraitDialog from './traits/ViewTraitDialog';

const RaceViewTraits: FC<{
  race: Race;
  setRace: Dispatch<SetStateAction<Race | undefined>>;
}> = ({ race, setRace }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [trait, setTrait] = useState<Trait | null>(null);

  const getRomanNumeral = (num: number) => {
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return romanNumerals[num - 1] || num.toString();
  };

  const getTraitName = (raceTrait: RaceTrait) => {
    if (raceTrait.tier) return `${t(raceTrait.traitId)} ${getRomanNumeral(raceTrait.tier)}`;
    return t(raceTrait.traitId);
  };

  if (!race) return <p>Loading...</p>;

  if (!race.traits || race.traits.length === 0) {
    return (
      <Grid size={12}>
        <Typography variant="body1" color="textSecondary">
          Race has no traits.
        </Typography>
      </Grid>
    );
  }

  return (
    <>
      <Grid container spacing={1} columns={10}>
        {race.traits.map((trait, index) => (
          <Grid size={{ xs: 5, md: 2 }} key={`trait-${index}`}>
            <RmuTextCard
              value={getTraitName(trait)}
              subtitle={t('trait')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
              onClick={() => {
                setTrait(trait);
                setDialogOpen(true);
              }}
            />
          </Grid>
        ))}
      </Grid>
      {trait && (
        <ViewTraitDialog
          race={race}
          setRace={setRace}
          trait={trait}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </>
  );
};

export default RaceViewTraits;
