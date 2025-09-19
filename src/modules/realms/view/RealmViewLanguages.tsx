import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { Language } from '../../api/language.dto';
import { fetchLanguages } from '../../api/languages';
import { Realm } from '../../api/realm.dto';
import LanguageCard from '../../shared/cards/LanguageCard';

const RealmViewLanguages: FC<{
  realm: Realm;
}> = ({ realm }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [languages, setLanguages] = useState<Language[]>([]);

  const bindLanguages = async (realmId: string) => {
    fetchLanguages(`realmId==${realmId}`, 0, 50)
      .then((response) => {
        setLanguages(response);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) console.error(err.message);
        else console.error(String(err));
      });
  };

  const onAddLanguage = () => {
    navigate(`/core/languages/create?realmId=${realm.id}`);
  };

  useEffect(() => {
    if (realm) {
      bindLanguages(realm.id);
    }
  }, [realm]);

  return (
    <Grid container spacing={2} direction="column">
      <Grid size={12}>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" color="primary" display="inline">
            {t('languages')}
          </Typography>
          <IconButton onClick={onAddLanguage} sx={{ ml: 1 }}>
            <AddCircleIcon />
          </IconButton>
        </Box>
      </Grid>
      <Grid size={12}>
        <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
          {languages.map((language) => (
            <LanguageCard key={language.id} language={language} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default RealmViewLanguages;
