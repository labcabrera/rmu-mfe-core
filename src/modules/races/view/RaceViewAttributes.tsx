import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Race } from '../../api/race.dto';
import NumericCard from '../../shared/cards/NumericCard';
import TextCard from '../../shared/cards/TextCard';

const imageBaseUrl = process.env.RMU_MFE_ASSETS!;

const RaceViewAttributes: FC<{
  race: Race;
}> = ({ race }) => {
  const { t } = useTranslation();

  return (
    <>
      <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
        <TextCard
          value={t(race.sizeId)}
          subtitle={t('race-size')}
          image={`${imageBaseUrl}images/generic/race-size.png`}
        />
        <NumericCard
          value={race.baseHits}
          subtitle={t('base-hit-points')}
          image={`${imageBaseUrl}images/generic/hp.png`}
          applyColor={false}
        />
        <NumericCard
          value={race.strideBonus}
          subtitle={t('stride-bonus')}
          image={`${imageBaseUrl}images/generic/stride-bonus.png`}
        />
        <NumericCard
          value={race.enduranceBonus}
          subtitle={t('endurance-bonus')}
          image={`${imageBaseUrl}images/generic/stat-co.png`}
        />
        <NumericCard
          value={race.recoveryMultiplier}
          subtitle={t('recovery-multiplier')}
          image={`${imageBaseUrl}images/generic/physical.png`}
          applyColor={false}
        />
        <NumericCard
          value={race.baseAt}
          subtitle={t('base-at')}
          image={`${imageBaseUrl}images/generic/trait-racial.png`}
          applyColor={false}
        />
        <NumericCard
          value={race.baseDevPoints}
          subtitle={t('base-dev-points')}
          image={`${imageBaseUrl}images/generic/trait-combat.png`}
          applyColor={false}
        />
        <TextCard
          value={race.defaultLanguage || t('none')}
          subtitle={t('native-language')}
          image={`${imageBaseUrl}images/generic/language.png`}
        />
        <TextCard
          value={`${race.averageHeight.male} / ${race.averageHeight.female}`}
          subtitle={t('average-height')}
          image={`${imageBaseUrl}images/generic/race-size.png`}
        />{' '}
        <TextCard
          value={`${race.averageWeight.male} / ${race.averageWeight.female}`}
          subtitle={t('average-weight')}
          image={`${imageBaseUrl}images/generic/race-size.png`}
        />
      </Box>
    </>
  );
};

export default RaceViewAttributes;
