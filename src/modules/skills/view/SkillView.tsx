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
import SkillViewResume from './SkillViewResume';

const SkillView: FC = () => {
  const location = useLocation();
  const { skillId } = useParams<{ skillId?: string }>();
  const { showError } = useError();
  const [skill, setSkill] = useState<Skill | null>(null);

  useEffect(() => {
    if (location.state && location.state.skill) {
      setSkill(location.state.skill);
    } else if (skillId) {
      fetchSkill(skillId)
        .then((response) => setSkill(response))
        .catch((err: unknown) => {
          if (err instanceof Error) showError(err.message);
          else showError(String(err));
        });
    }
  }, [location.state, skillId, showError]);

  if (!skill) return <p>Loading...</p>;

  return (
    <>
      <SkillViewActions skill={skill} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 2 }}>
          <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/configuration.png`} />
          <SkillViewResume skill={skill} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <SkillViewInfo skill={skill} />
        </Grid>
      </Grid>
    </>
  );
};

export default SkillView;
