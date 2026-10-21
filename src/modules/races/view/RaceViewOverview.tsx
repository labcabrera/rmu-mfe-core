import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import {
  bonusColor,
  formatBonus,
  KeyValueList,
  KeyValuePanel,
  Panel,
  Race,
  RaceResistances,
  resistances,
  StatBonusGrid,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { Bento, span } from '../../shared/layout/Bento';

/** Signed, colored bonus for the value column of a key / value list. */
const Bonus = ({ value }: { value: number }) => (
  <Box component="span" sx={{ color: bonusColor(value) }}>
    {formatBonus(value)}
  </Box>
);

/** Overview section of a race: description, racial stat bonuses, resistances and physique. */
const RaceViewOverview: FC<{ race: Race }> = ({ race }) => {
  const { t } = useTranslation();
  const raceResistances = (race.resistances ?? {}) as Partial<RaceResistances>;
  const gender = `${t('male')} / ${t('female')}`;

  return (
    <Bento>
      <Box sx={span(12, 8)}>
        <Panel title={t('description')}>
          <Typography
            variant="body2"
            color={race.description ? 'text.primary' : 'text.secondary'}
            sx={{ whiteSpace: 'pre-line' }}
          >
            {race.description || t('no-description')}
          </Typography>
        </Panel>
      </Box>
      <Box sx={span(12, 4)}>
        <KeyValuePanel
          title={t('physique')}
          rows={[
            {
              label: t('average-height'),
              hint: gender,
              value: `${race.averageHeight?.male ?? '-'} / ${race.averageHeight?.female ?? '-'}`,
            },
            {
              label: t('average-weight'),
              hint: gender,
              value: `${race.averageWeight?.male ?? '-'} / ${race.averageWeight?.female ?? '-'}`,
            },
            { label: t('race-size'), value: t(`size-${race.sizeId}`) },
          ]}
        />
      </Box>
      <Box sx={span(12, 8)}>
        <Panel title={t('statistics')}>
          <StatBonusGrid stats={race.stats ?? {}} />
        </Panel>
      </Box>
      <Box sx={span(12, 4)}>
        <Panel title={t('resistances')}>
          <KeyValueList
            rows={resistances.map((resistance) => ({
              label: t(resistance),
              value: <Bonus value={raceResistances[resistance as keyof RaceResistances] ?? 0} />,
            }))}
          />
        </Panel>
      </Box>
    </Bento>
  );
};

export default RaceViewOverview;
