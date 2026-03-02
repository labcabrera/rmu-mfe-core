import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { Language, UpdateLanguageDto } from '../../api/language.dto';
import { fetchLanguage } from '../../api/languages';
import { imageBaseUrl } from '../../services/config';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import LanguageEditActions from './LanguageEditActions';
import LanguageEditAttributes from './LanguageEditAttributes';

const LanguageEdit: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const [language, setLanguage] = useState<Language | null>(null);
  const { languageId } = useParams<{ languageId?: string }>();
  const [formData, setFormData] = useState<UpdateLanguageDto | null>(null);

  useEffect(() => {
    if (language) {
      setFormData({
        name: language.name,
        description: language.description,
      });
    }
  }, [language]);

  useEffect(() => {
    if (location.state && location.state.language) {
      setLanguage(location.state.language);
    } else if (languageId) {
      fetchLanguage(languageId)
        .then((response) => setLanguage(response))
        .catch((err) => showError(err.message));
    }
  }, [location.state, languageId, showError]);

  if (!language || !formData) return <div>Loading...</div>;

  return (
    <>
      <LanguageEditActions language={language} formData={formData} />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/language.png`} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LanguageEditAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
    </>
  );
};

export default LanguageEdit;
