import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { TechnicalInfo } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { fetchEnumerations } from '../../api/enumerations';
import { Enumeration } from '../../api/enumerations.dto';
import { fetchSkill } from '../../api/skill';
import { Skill } from '../../api/skill.dto';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import SkillViewActions from './SkillViewActions';
import SkillViewInfo from './SkillViewInfo';
import SkillViewSpecializations from './SkillViewSpecializations';

const SkillView: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const { skillId } = useParams<{ skillId?: string }>();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [enumerations, setEnumerations] = useState<Enumeration[]>();

  const bindSkill = (skillId: string) => {
    fetchSkill(skillId)
      .then((response) => setSkill(response))
      .catch((err) => showError(err.message));
  };

  const bindEnumerations = () => {
    if (!skill?.specialization) return;
    fetchEnumerations(`category==${skill?.specialization}`, 0, 100)
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
    <>
      <SkillViewActions skill={skill} onRefresh={() => bindSkill(skillId!)} />
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <SkillViewInfo skill={skill} />
          {enumerations && <SkillViewSpecializations enumerations={enumerations} />}
          <TechnicalInfo>
            <pre>Skill: {JSON.stringify(skill, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default SkillView;
