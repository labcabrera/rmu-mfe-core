import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { EffectType, RmuTextCard, Section, StatRow } from '@labcabrera-rmu/rmu-react-shared-lib';
import { imageBaseUrl } from '../../services/config';

const EffectTypeViewInfo: FC<{
  effectType: EffectType;
}> = ({ effectType }) => {
  const { t } = useTranslation();
  const image = `${imageBaseUrl}images/generic/configuration.png`;

  return (
    <Section title={t(effectType.id)}>
      <Grid container spacing={2}>
        <Grid size={4}>
          <StatRow
            label={t('value')}
            value={effectType.value}
            danger={effectType.value === 'forbidden'}
            success={effectType.value === 'required'}
          />
          <StatRow
            label={t('modifier')}
            value={effectType.modifier}
            danger={effectType.modifier === 'forbidden'}
            success={effectType.modifier === 'required'}
          />
          <StatRow
            label={t('rounds')}
            value={effectType.rounds}
            danger={effectType.rounds === 'forbidden'}
            success={effectType.rounds === 'required'}
          />
          <StatRow
            label={t('delay')}
            value={effectType.delay}
            danger={effectType.delay === 'forbidden'}
            success={effectType.delay === 'required'}
          />
          <StatRow
            label={t('text')}
            value={effectType.text}
            danger={effectType.text === 'forbidden'}
            success={effectType.text === 'required'}
          />
          <StatRow
            label={t('location')}
            value={effectType.location}
            danger={effectType.location === 'forbidden'}
            success={effectType.location === 'required'}
          />
        </Grid>
        <Grid size={4}>
          <StatRow label={t('is-persistent')} value={effectType.isPersistent ? 'yes' : 'no'} />
          <StatRow label={t('is-stackable')} value={effectType.isStackable ? 'yes' : 'no'} />
        </Grid>
      </Grid>
    </Section>
  );
};

export default EffectTypeViewInfo;
