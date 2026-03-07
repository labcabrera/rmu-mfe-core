import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchProfession } from '../../api/profession';
import { Profession, UpdateProfessionDto } from '../../api/profession.dto';
import EditableAvatar from '../../shared/avatars/EditableAvatar';
import CategorySeparator from '../../shared/display/CategorySeparator';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
import ProfessionEditActions from './ProfessionEditActions';
import ProfessionEditAttributes from './ProfessionEditAttributes';

const ProfessionEdit: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const { professionId } = useParams<{ professionId: string }>();
  const [profession, setProfession] = useState<Profession>();
  const [formData, setFormData] = useState<UpdateProfessionDto>();

  useEffect(() => {
    if (profession) {
      setFormData(profession);
    }
  }, [profession]);

  useEffect(() => {
    if (location.state && location.state.profession) {
      setProfession(location.state.profession);
    } else if (professionId) {
      fetchProfession(professionId)
        .then((response) => setProfession(response))
        .catch((err) => showError(err.message));
    }
  }, [location.state, professionId, showError]);

  if (!profession || !formData) return <div>Loading profession...</div>;

  return (
    <>
      <ProfessionEditActions profession={profession} formData={formData} />
      <Grid container spacing={2} padding={1}>
        <Grid size={{ xs: 12, md: 2 }}>
          <EditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(image) => setFormData({ ...formData, imageUrl: image })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }} padding={1}>
          <ProfessionEditAttributes formData={formData} setFormData={setFormData} />
          <CategorySeparator text={t('Skill costs')} />
          <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfessionEdit;
