import React, { Dispatch, FC, SetStateAction } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import { CreateProfessionDto } from '../../api/profession.dto';

const ProfessionCreationProfessionalSkills: FC<{
  formData: CreateProfessionDto;
  setFormData: Dispatch<SetStateAction<CreateProfessionDto>>;
}> = ({ formData, setFormData }) => {
  const skills = formData.professionalSkills ?? [];

  const handleDelete = (index: number) => {
    const next = [...skills];
    next.splice(index, 1);
    setFormData({ ...formData, professionalSkills: next });
  };

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <List dense>
          {skills.length === 0 ? (
            <ListItem>
              <ListItemText primary="No professional skills" />
            </ListItem>
          ) : (
            skills.map((s: any, idx: number) => (
              <ListItem key={idx} secondaryAction>
                <ListItemText primary={String(s)} />
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
