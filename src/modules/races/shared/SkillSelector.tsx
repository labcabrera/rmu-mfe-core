/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, FC } from 'react';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { Grid, ToggleButton, ToggleButtonGroup, Box, Typography } from '@mui/material';
import {
  fetchEnumerations,
  fetchSkillCategories,
  fetchSkills,
  Skill,
  SkillCategory,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';

const AddSkillDialog: FC<{
  realmId?: string;
  onSkillChange: (skillId: string | null) => void;
  onSpecializationChange: (specialization: string | null) => void;
  onError: (message: string) => void;
}> = ({ realmId, onSkillChange, onSpecializationChange, onError }) => {
  const [availableCategories, setAvailableCategories] = useState<SkillCategory[]>([]);
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
  const [availableSpecializations, setAvailableSpecializations] = useState<string[]>();

  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);

  const bindSkillCategories = () => {
    fetchSkillCategories('', 0, 100)
      .then((data) => setAvailableCategories(data.content))
      .catch((error) => onError(error.message));
  };

  const bindSkills = (categoryId: string) => {
    fetchSkills(`categoryId==${categoryId}`, 0, 100)
      .then((data) => setAvailableSkills(data.content))
      .catch((error) => onError(error.message));
  };

  useEffect(() => {
    onSpecializationChange(selectedSpecialization);
  }, [selectedSpecialization]);

  useEffect(() => {
    onSkillChange(selectedSkill ? selectedSkill.id : null);
    if (selectedSkill) {
      if (!selectedSkill.specialization) {
        setAvailableSpecializations(undefined);
      } else {
        const realmQuery = realmId ? `;(realmId==${realmId},realmId==null)` : ``;
        fetchEnumerations(`category==${selectedSkill.specialization}${realmQuery}`, 0, 100)
          .then((response) => setAvailableSpecializations(response.content.map((e) => e.key)))
          .catch((err) => onError(err.message));
      }
    }
  }, [selectedSkill]);

  useEffect(() => {
    if (selectedCategory) {
      bindSkills(selectedCategory.id);
    }
    setAvailableSpecializations(undefined);
  }, [selectedCategory]);

  useEffect(() => {
    bindSkillCategories();
  }, [realmId]);

  if (!availableCategories) return <p>Loading...</p>;

  return (
    <Grid container spacing={1} sx={{ mt: 1 }}>
      <Grid size={4}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          {t('Skill category')}
        </Typography>
        <SelectionList
          value={selectedCategory}
          options={availableCategories}
          onChange={(value: any) => setSelectedCategory(value)}
          formatter={(value: any) => t(value.id as string)}
        />
      </Grid>
      <Grid size={4}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          {t('Skill')}
        </Typography>
        {selectedCategory ? (
          <SelectionList
            value={selectedSkill}
            options={availableSkills}
            onChange={(value: any) => setSelectedSkill(value as Skill)}
            formatter={(value: any) => {
              return (
                <>
                  {t(value.id)}
                  {value.specialization && <EditSquareIcon sx={{ ml: 1, fontSize: '0.8em' }} />}
                </>
              );
            }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            {t('select-skill-category-first')}
          </Typography>
        )}
      </Grid>
      <Grid size={4}>
        {selectedSkill && availableSpecializations && (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t('Specialization')}
            </Typography>
            <SelectionList
              value={selectedSpecialization}
              options={availableSpecializations}
              onChange={(value) => setSelectedSpecialization(value)}
              formatter={(value: any) => t(value as string)}
            />
          </>
        )}
      </Grid>
    </Grid>
  );
};

const SelectionList: FC<{
  value: any;
  options: any[];
  onChange: (value: any) => void;
  formatter: (value: any) => any;
}> = ({ value, options, onChange, formatter }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <ToggleButtonGroup
        orientation="vertical"
        value={value}
        exclusive
        onChange={(_event, skill) => onChange(skill)}
        size="small"
        fullWidth
      >
        {options.map((s) => (
          <ToggleButton key={`option-${s.id}`} value={s} sx={{ justifyContent: 'flex-start' }}>
            {formatter(s)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default AddSkillDialog;
