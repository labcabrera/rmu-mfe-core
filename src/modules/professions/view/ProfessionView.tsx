import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchProfession, updateProfession } from '../../api/profession';
import { Profession } from '../../api/profession.dto';
import EdditableAvatar from '../../shared/avatars/EditableAvatar';
import CategorySeparator from '../../shared/display/CategorySeparator';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
import ProfessionViewActions from './ProfessionViewActions';
import ProfessionViewSkillCosts from './ProfessionViewSkillCosts';

const ProfessionView: FC = () => {
  const { showError } = useError();
  const { professionId } = useParams<{ professionId: string | undefined }>();
  const [profession, setProfession] = useState<Profession>();

  const onUpdateImage = (imageUrl: string) => {
    updateProfession(profession!.id, { imageUrl: imageUrl! })
      .then((updatedProfession) => setProfession(updatedProfession))
      .catch((err: Error) => showError(err.message));
  };

  useEffect(() => {
    if (professionId) {
      fetchProfession(professionId)
        .then((response) => setProfession(response))
        .catch((err: Error) => showError(err.message));
    }
  }, [professionId, showError]);

  if (!profession) return <p>Loading profession...</p>;

  return (
    <>
      <ProfessionViewActions profession={profession} setProfession={setProfession} />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}>
          <EdditableAvatar imageUrl={profession.imageUrl || ''} onImageChange={(avatar) => onUpdateImage(avatar)} />
          <Typography variant="h6" color="primary">
            {t(profession.id)}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }} padding={1}>
          <CategorySeparator text={t('Skill costs')} />
          <ProfessionViewSkillCosts profession={profession} />
          <CategorySeparator text={t('Professional skills')} />
          <Grid container spacing={1} columns={10}>
            <Grid size={{ xs: 12, md: 2 }}>TODO</Grid>
          </Grid>
          <Grid size={12} mt={2}>
            <TechnicalInfo>
              <pre>{JSON.stringify(profession, null, 2)}</pre>
            </TechnicalInfo>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfessionView;
