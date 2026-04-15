/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Chip, Grid, Typography } from '@mui/material';
import {
  EditableAvatar,
  TechnicalInfo,
  updateCulture,
  Culture,
  fetchCulture,
  CategorySeparator,
  AddButton,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { gridSizeMain, gridSizeResume } from '../../services/display';
import { getAvatarImages } from '../../services/image-service';
import CultureViewActions from './CultureViewActions';
import AddCultureFixedSkillDialog from './skills/AddCultureFixedSkillDialog';
import CultureSkillTable from './skills/CultureSkillTable';

const CultureView: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const { cultureId } = useParams<{ cultureId: string | undefined }>();
  const [culture, setCulture] = useState<Culture>({} as Culture);
  const [addCultureFixedSkillDialogOpen, setAddCultureFixedSkillDialogOpen] = useState<boolean>(false);

  const onUpdateImage = (imageUrl: string) => {
    updateCulture(culture!.id, { imageUrl: imageUrl })
      .then((response) => setCulture(response))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (location.state && location.state.culture) {
      setCulture(location.state.culture);
    } else if (cultureId) {
      fetchCulture(cultureId)
        .then((response) => setCulture(response))
        .catch((err) => showError(err.message));
    }
  }, [location.state, cultureId]);

  if (!culture) return <p>Loading race...</p>;

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}>
          <EditableAvatar
            imageUrl={culture.imageUrl || ''}
            onImageChange={(avatar) => onUpdateImage(avatar)}
            images={getAvatarImages()}
          />
          <Chip
            label={t(culture.accessType)}
            color={culture.accessType === 'public' ? 'success' : 'error'}
            size="small"
            sx={{ mt: 2 }}
          />
          <Typography variant="h6" color="primary">
            {t(culture.name)}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
            {culture.description}
          </Typography>
        </Grid>
        <Grid size={gridSizeMain}>
          <CultureViewActions culture={culture} setCulture={setCulture} />
          <Grid size={12}>
            <CategorySeparator text={t('Fixed skills')}>
              <AddButton onClick={() => setAddCultureFixedSkillDialogOpen(true)} />
            </CategorySeparator>
          </Grid>
          <Grid size={12}>
            <CultureSkillTable culture={culture} setCulture={setCulture} />
          </Grid>
          <Grid size={12} mt={5}>
            <TechnicalInfo>
              <pre>{JSON.stringify(culture, null, 2)} </pre>
            </TechnicalInfo>
          </Grid>
        </Grid>
      </Grid>
      <AddCultureFixedSkillDialog
        open={addCultureFixedSkillDialogOpen}
        culture={culture}
        setCulture={setCulture}
        onClose={() => setAddCultureFixedSkillDialogOpen(false)}
      />
    </>
  );
};

export default CultureView;
