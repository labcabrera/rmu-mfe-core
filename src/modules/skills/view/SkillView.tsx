import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchSkill } from '../../api/skill';
import { Skill } from '../../api/skill.dto';
import { imageBaseUrl } from '../../services/config';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import SkillViewActions from './SkillViewActions';
import SkillViewInfo from './SkillViewInfo';

const SkillView: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const { skillId } = useParams<{ skillId?: string }>();
  const [skill, setSkill] = useState<Skill | null>(null);

  const bindSkill = (skillId: string) => {
    fetchSkill(skillId)
      .then((response) => setSkill(response))
      .catch((err) => showError(err.message));
  };

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
        <Grid size={{ xs: 12, md: 2 }}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/configuration.png`} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <SkillViewInfo skill={skill} />
        </Grid>
      </Grid>
    </>
  );
};

export default SkillView;
