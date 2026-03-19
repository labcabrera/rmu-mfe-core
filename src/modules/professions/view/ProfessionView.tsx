import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Chip, Grid, Stack } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchProfession } from '../../api/profession';
import { Profession } from '../../api/profession.dto';
import CategorySeparator from '../../shared/display/CategorySeparator';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
import ProfessionViewActions from './ProfessionViewActions';
import ProfessionViewProfessionalSkills from './ProfessionViewProfessionalSkills';
import ProfessionViewResume from './ProfessionViewResume';
import ProfessionViewSkillCosts from './ProfessionViewSkillCosts';

const ProfessionView: FC = () => {
  const { showError } = useError();
  const { professionId } = useParams<{ professionId: string | undefined }>();
  const [profession, setProfession] = useState<Profession>();

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
          <ProfessionViewResume profession={profession} setProfession={setProfession} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }} padding={1}>
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

          <Box mt={2}>
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
  <Stack direction="row" spacing={1} flexWrap="wrap">
    {realmTypes.map((rt) => (
      <Chip key={rt} label={t(rt)} />
    ))}
  </Stack>
);

export default ProfessionView;
