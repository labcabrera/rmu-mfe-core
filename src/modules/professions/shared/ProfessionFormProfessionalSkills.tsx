import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Chip, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { CreateProfessionDto, UpdateProfessionDto } from '../../api/profession.dto';
import { fetchPagedSkills } from '../../api/skill';
import { Skill } from '../../api/skill.dto';
import AddButton from '../../shared/buttons/AddButton';
import SelectSkill from '../../shared/selects/SelectSkill';

const ProfessionFormProfessionalSkills: FC<{
  formData: CreateProfessionDto | UpdateProfessionDto;
  setFormData: Dispatch<SetStateAction<CreateProfessionDto | UpdateProfessionDto | undefined>>;
}> = ({ formData, setFormData }) => {
  const { showError } = useError();
  const [allSkills, setAllSkills] = React.useState<string[]>([]);
  const [selectedSkillId, setSelectedSkillId] = React.useState<string | null>(null);
  const skills = formData.professionalSkills ?? [];

  const handleDelete = (index: number) => {
    const next = [...skills];
    next.splice(index, 1);
    setFormData({ ...formData, professionalSkills: next });
  };

  const onAddSkill = (skillId: string) => {
    const next = [...skills, skillId];
    setFormData({ ...formData, professionalSkills: next });
    setSelectedSkillId(null);
  };

  useEffect(() => {
    fetchPagedSkills('', 0, 500)
      .then((response) => setAllSkills(response.content.map((s: Skill) => s.id)))
      .catch((err: Error) => showError(err.message));
  }, []);

  if (!allSkills || allSkills.length === 0) return <p>Loading skills...</p>;

  return (
    <Grid container spacing={1}>
      <Grid size={6}>
        <SelectSkill
          label={t('Skill')}
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
          <Typography>No professional skills</Typography>
        ) : (
          <Grid container spacing={1}>
            {skills.map((s: any, idx: number) => (
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
