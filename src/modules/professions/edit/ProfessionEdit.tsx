import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchProfession } from '../../api/profession';
import { Profession, UpdateProfessionDto } from '../../api/profession.dto';
import EditableAvatar from '../../shared/avatars/EditableAvatar';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
import ProfessionForm from '../shared/ProfessionForm';
import ProfessionEditActions from './ProfessionEditActions';

const ProfessionEdit: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const { professionId } = useParams<{ professionId: string }>();
  const [profession, setProfession] = useState<Profession>();
  const [formData, setFormData] = useState<UpdateProfessionDto>();

  useEffect(() => {
    if (profession) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = profession;
      setFormData(rest as UpdateProfessionDto);
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
          <Typography variant="h6" mt={2}>
            {t(profession.id)}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }} padding={1}>
          <ProfessionForm formData={formData} setFormData={setFormData} creationMode={false} />
          <TechnicalInfo>
            <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfessionEdit;
