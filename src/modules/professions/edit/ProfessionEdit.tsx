import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import {
  EditableAvatar,
  TechnicalInfo,
  Profession,
  UpdateProfessionDto,
  fetchProfession,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import { getAvatarImages } from '../../services/image-service';
import ProfessionForm from '../shared/ProfessionForm';
import ProfessionEditActions from './ProfessionEditActions';
import { useAuth } from 'react-oidc-context';

const ProfessionEdit: FC = () => {
  const location = useLocation();
  const auth = useAuth();
  const { showError } = useError();
  const { professionId } = useParams<{ professionId: string }>();
  const [profession, setProfession] = useState<Profession>();
  const [formData, setFormData] = useState<UpdateProfessionDto>();

  useEffect(() => {
    if (profession) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      const { id, ...rest } = profession;
      setFormData(rest as UpdateProfessionDto);
    }
  }, [profession]);

  useEffect(() => {
    if (location.state && location.state.profession) {
      setProfession(location.state.profession);
    } else if (professionId) {
      fetchProfession(professionId, auth)
        .then((response) => setProfession(response))
        .catch((err) => showError(err.message));
    }
  }, [location.state, professionId]);

  if (!profession || !formData) return <div>Loading profession...</div>;

  return (
    <Grid container spacing={2}>
      <Grid size={gridSizeResume}>
        <EditableAvatar
          imageUrl={formData.imageUrl || ''}
          onImageChange={(image) => setFormData({ ...formData, imageUrl: image })}
          images={getAvatarImages()}
        />
        <Typography variant="h6" sx={{mt:2}}>
          {t(profession.id)}
        </Typography>
      </Grid>
      <Grid size={gridSizeMain}>
        <ProfessionEditActions profession={profession} formData={formData} />
        <ProfessionForm formData={formData} setFormData={setFormData} creationMode={false} />
        <TechnicalInfo>
          <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
        </TechnicalInfo>
      </Grid>
    </Grid>
  );
};

export default ProfessionEdit;
