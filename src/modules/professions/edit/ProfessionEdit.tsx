import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';
import {
  EditableAvatar,
  TechnicalInfo,
  Profession,
  fetchProfession,
  LayoutBase,
  CancelButton,
  SaveButton,
  updateProfession,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import ProfessionForm from '../form/ProfessionForm';
import ProfessionEditActions from './ProfessionEditActions';

export default function ProfessionEdit() {
  const location = useLocation();
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const { professionId } = useParams<{ professionId: string }>();
  const [profession, setProfession] = useState<Profession>();
  const [formData, setFormData] = useState<Profession>({} as unknown as Profession);

  const onSave = async () => {
    updateProfession(profession!.id, formData, auth)
      .then((response) => navigate(`/core/professions/view/${response.id}`, { state: { profession: response } }))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (profession) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      const { id, ...rest } = profession;
      setFormData(rest as Profession);
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
    <>
      <LayoutBase
        breadcrumbs={[
          { name: t('home'), link: '/core' },
          { name: t('core'), link: '/core' },
          { name: t('profession'), link: `/core/professions/view/${profession.id}` },
          { name: t('edit') },
        ]}
        actions={[
          <CancelButton
            onClick={() => navigate(`/core/professions/view/${profession.id}`, { state: { profession: profession } })}
          />,
          <SaveButton onClick={() => onSave()} />,
        ]}
        leftPanel={
          <>
            <EditableAvatar
              imageUrl={formData.imageUrl || ''}
              onImageChange={(image) => setFormData({ ...formData, imageUrl: image })}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              {t(profession.id)}
            </Typography>
          </>
        }
      >
        <ProfessionForm formData={formData} setFormData={setFormData} creationMode={false} />
        <TechnicalInfo>
          <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
        </TechnicalInfo>
      </LayoutBase>

      <Grid container spacing={2}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <ProfessionEditActions profession={profession} formData={formData} />
          <Paper sx={{ p: 2 }}></Paper>
        </Grid>
      </Grid>
    </>
  );
}
