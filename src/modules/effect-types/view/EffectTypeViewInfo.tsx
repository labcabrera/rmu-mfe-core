import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { EffectType, Section, StatRow } from '@labcabrera-rmu/rmu-react-shared-lib';
import { imageBaseUrl } from '../../services/config';

export default function EffectTypeViewInfo({ effectType }: { effectType: EffectType }) {
  const { t } = useTranslation();
  const image = `${imageBaseUrl}images/generic/configuration.png`;

  return (
    <Section title={t(effectType.id)}>
      <Grid container spacing={2}>
        <Grid size={{ sm: 12, lg: 4 }}>
          <StatRow
            label={t('value')}
            value={t(effectType.value)}
            danger={effectType.value === 'forbidden'}
            success={effectType.value === 'required'}
          />
          <StatRow
            label={t('modifier')}
            value={t(effectType.modifier)}
            danger={effectType.modifier === 'forbidden'}
            success={effectType.modifier === 'required'}
          />
          <StatRow
            label={t('rounds')}
            value={t(effectType.rounds)}
            danger={effectType.rounds === 'forbidden'}
            success={effectType.rounds === 'required'}
          />
          <StatRow
            label={t('delay')}
            value={t(effectType.delay)}
            danger={effectType.delay === 'forbidden'}
            success={effectType.delay === 'required'}
          />
          <StatRow
            label={t('text')}
            value={t(effectType.text)}
            danger={effectType.text === 'forbidden'}
            success={effectType.text === 'required'}
          />
          <StatRow
            label={t('location')}
            value={t(effectType.location)}
            danger={effectType.location === 'forbidden'}
            success={effectType.location === 'required'}
          />
          <StatRow label={t('is-persistent')} value={t(effectType.isPersistent ? 'yes' : 'no')} />
          <StatRow label={t('is-stackable')} value={t(effectType.isStackable ? 'yes' : 'no')} />
        </Grid>
      </Grid>
    </Section>
  );
}
