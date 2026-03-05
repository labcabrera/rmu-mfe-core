import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { Language } from '../../api/language.dto';
import { imageBaseUrl } from '../../services/config';
import RmuTextCard from '../../shared/cards/RmuTextCard';

const LanguageViewInfo: FC<{
  language: Language;
}> = ({ language }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h6" color="primary">
          {language.name}
        </Typography>
      </Grid>
      <Grid size={12}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 3 }}>
            <RmuTextCard
              value={language.realmName}
              subtitle={t('realm')}
              image={`${imageBaseUrl}images/generic/realm.png`}
              onClick={() => navigate(`/core/realms/view/${language.realmId}`)}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Typography variant="body1">{language.description}</Typography>
      </Grid>
    </Grid>
  );
};

export default LanguageViewInfo;
