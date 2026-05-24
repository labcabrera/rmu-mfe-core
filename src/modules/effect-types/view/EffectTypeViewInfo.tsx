import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { EffectType, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { imageBaseUrl } from '../../services/config';

const EffectTypeViewInfo: FC<{
  effectType: EffectType;
}> = ({ effectType }) => {
  const { t } = useTranslation();
  const image = `${imageBaseUrl}images/generic/configuration.png`;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography variant="h6" color="primary" gutterBottom>
          {t(effectType.id)}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <RmuTextCard value={t(effectType.isPersistent ? 'yes' : 'no')} subtitle={t('is-persistent')} image={image} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <RmuTextCard value={t(effectType.isStackable ? 'yes' : 'no')} subtitle={t('is-stackable')} image={image} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <RmuTextCard value={t(effectType.accessType)} subtitle={t('access-type')} image={image} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <RmuTextCard value={t(effectType.entitySource)} subtitle={t('entity-source')} image={image} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <RmuTextCard value={t(effectType.value)} subtitle={t('value')} image={image} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <RmuTextCard value={t(effectType.modifier)} subtitle={t('modifier')} image={image} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <RmuTextCard value={t(effectType.rounds)} subtitle={t('rounds')} image={image} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <RmuTextCard value={t(effectType.text)} subtitle={t('text')} image={image} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <RmuTextCard value={t(effectType.location)} subtitle={t('location')} image={image} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <RmuTextCard value={t(effectType.delay)} subtitle={t('delay')} image={image} />
      </Grid>
    </Grid>
  );
};

export default EffectTypeViewInfo;
