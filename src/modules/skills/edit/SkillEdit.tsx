/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { GenericAvatar, TechnicalInfo } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { fetchSkill } from '../../api/skill';
import { Skill, UpdateSkillDto } from '../../api/skill.dto';
import { imageBaseUrl } from '../../services/config';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import SkillForm from '../shared/SkillForm';
import SkillEditActions from './SkillEditActions';

const SkillEdit: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const { skillId } = useParams<{ skillId?: string }>();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<UpdateSkillDto | undefined>();
  const [isValid, setIsValid] = useState(false);

  const bindSkill = (skillId: string) => {
    fetchSkill(skillId)
      .then((response) => setSkill(response))
      .catch((err) => showError(err.message));
  };

  const validateForm = () => {
    console.log('validateForm');
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
      setFormData(rest);
    }
  }, [skill]);

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  if (!skill || !formData) return <p>Loading...</p>;

  return (
    <>
      <SkillEditActions skill={skill} formData={formData} isValid={true} />
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/configuration.png`} />
        </Grid>
        <Grid size={gridSizeMain}>
          <SkillForm formData={formData} setFormData={setFormData} create={false} />
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
