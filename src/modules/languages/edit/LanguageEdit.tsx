import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Language, UpdateLanguageDto } from '../../api/language.dto';
import LanguageEditActions from './LanguageEditActions';
import LanguageEditAttributes from './LanguageEditAttributes';

const LanguageEdit: FC = () => {
  const location = useLocation();
  const language = (location.state as { language?: Language })?.language;

  const [formData, setFormData] = useState<UpdateLanguageDto>({
    name: language?.name || '',
    description: language?.description || '',
  });

  if (!language) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <LanguageEditActions language={language} formData={formData} />
      <Grid container spacing={1}>
        <Grid size={4}>
          <LanguageEditAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
    </>
  );
};

export default LanguageEdit;
