import React, { FC, useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useLocation, useParams } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import { Culture, EditableAvatar, fetchCulture, TechnicalInfo } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import { getAvatarImages } from '../../services/image-service';
import CultureForm from '../shared/CultureForm';
import RaceEditActions from './CultureEditActions';

const CultureEdit: FC = () => {
  const location = useLocation();
  const auth = useAuth();
  const { showError } = useError();
  const { cultureId } = useParams<{ cultureId: string }>();
  const [culture, setCulture] = useState<Culture>();
  const [formData, setFormData] = useState<Culture>({} as Culture);

  useEffect(() => {
    if (culture) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      const { id, ...rest } = culture;
      setFormData(rest as Culture);
    }
  }, [culture]);

  useEffect(() => {
    if (location.state && location.state.culture) {
      setCulture(location.state.culture);
    } else if (cultureId) {
      fetchCulture(cultureId, auth)
        .then((response) => setCulture(response))
        .catch((err) => showError(err.message));
    }
  }, [location.state, cultureId]);

  if (!culture || !formData) return <div>Loading race...</div>;

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={gridSizeResume}>
          <EditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(image) => setFormData({ ...formData, imageUrl: image })}
            images={getAvatarImages()}
          />
        </Grid>
        <Grid size={gridSizeMain}>
          <RaceEditActions culture={culture} formData={formData} />
          <Paper sx={{ p: 2 }}>
            <CultureForm formData={formData} setFormData={setFormData} />
          </Paper>
          <TechnicalInfo>
            <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default CultureEdit;
