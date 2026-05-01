/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Enumeration, fetchEnumerations, fetchSkill, Skill, TechnicalInfo } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import SkillViewActions from './SkillViewActions';
import SkillViewInfo from './SkillViewInfo';
import SkillViewSpecializations from './SkillViewSpecializations';
import { useAuth } from 'react-oidc-context';

const SkillView: FC = () => {
  const auth = useAuth();
  const location = useLocation();
  const { showError } = useError();
  const { skillId } = useParams<{ skillId?: string }>();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [enumerations, setEnumerations] = useState<Enumeration[]>();

  const bindSkill = (skillId: string) => {
    fetchSkill(skillId, auth)
      .then((response) => setSkill(response))
      .catch((err) => showError(err.message));
  };

  const bindEnumerations = () => {
    if (!skill?.specialization) return;
    fetchEnumerations(`category==${skill?.specialization}`, 0, 100, auth)
      .then((response) => setEnumerations(response.content))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (skill) {
      bindEnumerations();
    }
  }, [skill]);

  useEffect(() => {
    if (location.state && location.state.skill) {
      setSkill(location.state.skill);
    } else if (skillId) {
      bindSkill(skillId);
    }
  }, [location.state, skillId]);

  if (!skill) return <p>Loading...</p>;

  return (
    <Grid container spacing={1}>
      <Grid size={gridSizeResume}></Grid>
      <Grid size={gridSizeMain}>
        <SkillViewActions skill={skill} onRefresh={() => bindSkill(skillId!)} />
        <SkillViewInfo skill={skill} />
        {enumerations && <SkillViewSpecializations enumerations={enumerations} />}
        <TechnicalInfo>
          <pre>Skill: {JSON.stringify(skill, null, 2)}</pre>
        </TechnicalInfo>
      </Grid>
    </Grid>
  );
};

export default SkillView;
