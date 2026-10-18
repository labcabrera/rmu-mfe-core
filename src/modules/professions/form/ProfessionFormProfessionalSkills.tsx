import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Chip, Typography } from '@mui/material';
import {
  AddButton,
  fetchSkills,
  LoadingState,
  Profession,
  Skill,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectSkill from '../../shared/selects/SelectSkill';

const ProfessionFormProfessionalSkills: FC<{
  formData: Profession;
  setFormData: (data: Profession) => void;
}> = ({ formData, setFormData }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [allSkills, setAllSkills] = React.useState<string[]>([]);
  const [selectedSkillId, setSelectedSkillId] = React.useState<string | null>(null);
  // The lib DTO types professionalSkills as `[]`; it holds skill ids.
  const skills: string[] = formData.professionalSkills ?? [];

  const handleDelete = (index: number) => {
    const next = [...skills];
    next.splice(index, 1);
    setFormData({ ...formData, professionalSkills: next as [] });
  };

  const onAddSkill = (skillId: string) => {
    const next = [...skills, skillId];
    setFormData({ ...formData, professionalSkills: next as [] });
    setSelectedSkillId(null);
  };

  useEffect(() => {
    fetchSkills('', 0, 500, auth)
      .then((response) => setAllSkills(response.content.map((s: Skill) => s.id)))
      .catch((err: Error) => notify.error(err));
  }, []);

  if (!allSkills || allSkills.length === 0) return <LoadingState />;

  return (
    <Grid container spacing={1}>
      <Grid size={6}>
        <SelectSkill
          label={t('skill')}
          value={selectedSkillId || undefined}
          name={''}
          onChange={(skillId) => setSelectedSkillId(skillId)}
          skills={allSkills}
        />
      </Grid>
      <Grid size={6}>
        <AddButton onClick={() => onAddSkill(selectedSkillId!)} disabled={!selectedSkillId} />
      </Grid>
      <Grid size={12}>
        {skills.length === 0 ? (
          <Typography>{t('no-results')}</Typography>
        ) : (
          <Grid container spacing={1}>
            {skills.map((s, idx) => (
              <Chip
                key={`professional-skill-${idx}`}
                label={t(s)}
                onDelete={() => handleDelete(idx)}
                deleteIcon={<DeleteIcon fontSize="small" />}
              />
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfessionFormProfessionalSkills;
