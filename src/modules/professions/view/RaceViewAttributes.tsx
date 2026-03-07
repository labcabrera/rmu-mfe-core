import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { Race } from '../../api/race.dto';
import { imageBaseUrl } from '../../services/config';
import RmuTextCard from '../../shared/cards/RmuTextCard';

const grayscale = 0.7;

const RaceViewAttributes: FC<{
  race: Race;
}> = ({ race }) => {
  const cards: Array<{
    value: string | number;
    subtitle: string;
    image: string;
    applyColor?: boolean;
  }> = [
    {
      value: t(race.sizeId),
      subtitle: t('race-size'),
      image: `${imageBaseUrl}images/generic/race-size.png`,
    },
    {
      value: race.baseHits,
      subtitle: t('base-hit-points'),
      image: `${imageBaseUrl}images/generic/hp.png`,
      applyColor: false,
    },
    {
      value: race.strideBonus,
      subtitle: t('stride-bonus'),
      image: `${imageBaseUrl}images/generic/stride-bonus.png`,
      applyColor: true,
    },
    {
      value: race.enduranceBonus,
      subtitle: t('endurance-bonus'),
      image: `${imageBaseUrl}images/generic/stat-co.png`,
      applyColor: true,
    },
    {
      value: race.recoveryMultiplier,
      subtitle: t('recovery-multiplier'),
      image: `${imageBaseUrl}images/generic/physical.png`,
    },
    {
      value: race.baseAt,
      subtitle: t('base-at'),
      image: `${imageBaseUrl}images/generic/trait-racial.png`,
    },
    {
      value: race.baseDevPoints,
      subtitle: t('base-dev-points'),
      image: `${imageBaseUrl}images/generic/trait-combat.png`,
    },
    {
      value: `${race.averageHeight.male} / ${race.averageHeight.female}`,
      subtitle: t('average-height'),
      image: `${imageBaseUrl}images/generic/race-size.png`,
    },
    {
      value: `${race.averageWeight.male} / ${race.averageWeight.female}`,
      subtitle: t('average-weight'),
      image: `${imageBaseUrl}images/generic/race-size.png`,
    },
  ];

  return (
    <Grid container spacing={1} columns={10}>
      {cards.map((card, idx) => (
        <Grid key={`${card.subtitle}-${idx}`} size={{ xs: 12, md: 2 }}>
          <RmuTextCard
            value={card.value}
            subtitle={card.subtitle}
            image={card.image}
            grayscale={grayscale}
            applyColor={card.applyColor}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RaceViewAttributes;
