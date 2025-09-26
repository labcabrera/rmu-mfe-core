import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Race } from '../../api/race.dto';
import NumericCard from '../../shared/cards/NumericCard';
import TextCard from '../../shared/cards/TextCard';

const RaceViewAttributes: FC<{
  race: Race;
}> = ({ race }) => {
  const { t } = useTranslation();

  return (
    <>
      <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
        <TextCard value={t(race.sizeId)} subtitle={t('race-size')} image={`/static/images/generic/race-size.png`} />
        <NumericCard value={race.baseHits} subtitle={t('base-hit-points')} image={`/static/images/generic/hp.png`} applyColor={false} />
        <NumericCard value={race.strideBonus} subtitle={t('stride-bonus')} image={`/static/images/generic/stride-bonus.png`} />
        <NumericCard value={race.enduranceBonus} subtitle={t('endurance-bonus')} image={`/static/images/generic/stat-co.png`} />
        <NumericCard
          value={race.recoveryMultiplier}
          subtitle={t('recovery-multiplier')}
          image={`/static/images/generic/physical.png`}
          applyColor={false}
        />
        <NumericCard value={race.baseAt} subtitle={t('base-at')} image={`/static/images/generic/trait-racial.png`} applyColor={false} />
        <NumericCard
          value={race.baseDevPoints}
          subtitle={t('base-dev-points')}
          image={`/static/images/generic/trait-combat.png`}
          applyColor={false}
        />
        <TextCard value={race.defaultLanguage} subtitle={t('native-language')} image={`/static/images/generic/language.png`} />
        <TextCard
          value={`${race.averageHeight.male} / ${race.averageHeight.female}`}
          subtitle={t('average-height')}
          image={`/static/images/generic/race-size.png`}
        />{' '}
        <TextCard
          value={`${race.averageWeight.male} / ${race.averageWeight.female}`}
          subtitle={t('average-weight')}
          image={`/static/images/generic/race-size.png`}
        />
      </Box>
    </>
  );
};

export default RaceViewAttributes;
