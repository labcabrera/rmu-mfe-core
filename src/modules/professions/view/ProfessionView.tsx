import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useParams } from 'react-router-dom';
import { Box, Chip, Grid, Stack } from '@mui/material';
import { CategorySeparator, TechnicalInfo, Profession, fetchProfession } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import ProfessionViewActions from './ProfessionViewActions';
import ProfessionViewProfessionalSkills from './ProfessionViewProfessionalSkills';
import ProfessionViewResume from './ProfessionViewResume';
import ProfessionViewSkillCosts from './ProfessionViewSkillCosts';

const ProfessionView: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const { professionId } = useParams<{ professionId: string | undefined }>();
  const [profession, setProfession] = useState<Profession>();

  useEffect(() => {
    if (professionId) {
      fetchProfession(professionId, auth)
        .then((response) => setProfession(response))
        .catch((err: Error) => showError(err.message));
    }
  }, [professionId, auth]);

  if (!profession) return <p>Loading profession...</p>;

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}>
          <ProfessionViewResume profession={profession} setProfession={setProfession} />
        </Grid>
        <Grid size={gridSizeMain} sx={{ p: 1 }}>
          <ProfessionViewActions profession={profession} setProfession={setProfession} />
          {profession.availableRealmTypes.length > 0 && (
            <>
              <CategorySeparator text={t('Available realms')} />
              <RealmTypeChips realmTypes={profession.availableRealmTypes} />
            </>
          )}
          {profession.fixedRealmTypes.length > 0 && (
            <>
              <CategorySeparator text={t('Fixed realms')} />
              <RealmTypeChips realmTypes={profession.fixedRealmTypes} />
            </>
          )}
          <CategorySeparator text={t('Skill costs')} />
          <ProfessionViewSkillCosts profession={profession} />
          <CategorySeparator text={t('Professional skills')} />
          <ProfessionViewProfessionalSkills profession={profession} />

          <Box sx={{ mt: 2 }}>
            <TechnicalInfo>
              <pre>{JSON.stringify(profession, null, 2)}</pre>
            </TechnicalInfo>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const RealmTypeChips = ({ realmTypes }: { realmTypes: string[] }) => (
  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
    {realmTypes.map((rt) => (
      //TODO translate
      <Chip key={rt} label={rt} />
    ))}
  </Stack>
);

export default ProfessionView;
