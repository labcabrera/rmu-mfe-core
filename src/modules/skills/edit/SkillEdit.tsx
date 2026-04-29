/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useLocation, useParams } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import { fetchSkill, GenericAvatar, Skill, TechnicalInfo, UpdateSkillDto } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import SkillForm from '../shared/SkillForm';
import SkillEditActions from './SkillEditActions';

const SkillEdit: FC = () => {
  const location = useLocation();
  const auth = useAuth();
  const { showError } = useError();
  const { skillId } = useParams<{ skillId?: string }>();
  const [skill, setSkill] = useState<Skill>();
  const [formData, setFormData] = useState<Skill>({} as unknown as Skill);
  const [isValid, setIsValid] = useState(false);

  const bindSkill = (skillId: string) => {
    fetchSkill(skillId, auth)
      .then((response) => setSkill(response))
      .catch((err) => showError(err.message));
  };

  const validateForm = () => {
    if (!formData) return false;
    if (formData.categoryId) return false;
    return true;
  };

  useEffect(() => {
    if (location.state && location.state.skill) {
      setSkill(location.state.skill);
    } else if (skillId) {
      bindSkill(skillId);
    }
  }, [location.state, skillId]);

  useEffect(() => {
    if (skill) {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const { id, ...rest } = skill;
      setFormData(rest as unknown as Skill);
    }
  }, [skill]);

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  if (!skill || !formData) return <p>Loading...</p>;

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/configuration.png`} />
        </Grid>
        <Grid size={gridSizeMain}>
          <SkillEditActions skill={skill} formData={formData} isValid={true} />
          <Paper sx={{ p: 2 }}>
            <SkillForm formData={formData} setFormData={setFormData} create={false} />
          </Paper>
          <TechnicalInfo>
            <pre>Skill: {JSON.stringify(skill, null, 2)}</pre>
            <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default SkillEdit;
