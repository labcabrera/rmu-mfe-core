import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { CreateProfessionDto } from '../../api/profession.dto';
import { fetchPagedSkills } from '../../api/skill';
import { Skill } from '../../api/skill.dto';
import AddButton from '../../shared/buttons/AddButton';
import SelectSkill from '../../shared/selects/SelectSkill';

const ProfessionCreationProfessionalSkills: FC<{
  formData: CreateProfessionDto;
  setFormData: Dispatch<SetStateAction<CreateProfessionDto>>;
}> = ({ formData, setFormData }) => {
  const { showError } = useError();
  const [allSkills, setAllSkills] = React.useState<Skill[]>([]);
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
      .then((response) => setAllSkills(response.content))
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
          onChange={(skill) => setSelectedSkillId(skill?.id ?? null)}
          skills={allSkills}
        />
      </Grid>
      <Grid size={6}>
        <AddButton onClick={() => onAddSkill(selectedSkillId!)} disabled={!selectedSkillId} />
      </Grid>
      <Grid size={12}>
        <List dense>
          {skills.length === 0 ? (
            <ListItem>
              <ListItemText primary="No professional skills" />
            </ListItem>
          ) : (
            skills.map((s: any, idx: number) => (
              <ListItem key={idx} secondaryAction>
                <ListItemText primary={String(t(s))} />
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(idx)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItem>
            ))
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default ProfessionCreationProfessionalSkills;
