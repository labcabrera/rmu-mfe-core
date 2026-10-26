import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip } from '@mui/material';
import { Skill } from '@labcabrera-rmu/rmu-react-shared-lib';

/** The maneuver profile of a skill as chips: category, stats, type, table, light, movement, AP, specialization. */
const SkillProfile: FC<{ skill: Skill; categoryStats: string[] }> = ({ skill, categoryStats }) => {
  const { t } = useTranslation();
  const profile = skill.maneuver;
  const stats = [...categoryStats, ...skill.bonus].map((stat) => t(stat));
  const chips = [
    `${t('category')}: ${t(skill.categoryId)}`,
    ...(stats.length ? [`${t('stats')}: ${stats.join(' + ')}`] : []),
    ...(profile
      ? [
          `${t('default-maneuver-type')}: ${t(`maneuver-type-${profile.defaultType}`)}`,
          `${t('result-table')}: ${t(profile.resultTable)}`,
          ...(profile.light && profile.light !== 'none'
            ? [`${t('light-usage')}: ${t(`light-usage-${profile.light}`)}`]
            : []),
          ...(profile.movement ? [t('maneuver-movement-hint')] : []),
          ...(profile.actionPoints
            ? [`${t('action-points-range')}: ${profile.actionPoints.min}-${profile.actionPoints.max}`]
            : []),
        ]
      : []),
    ...(skill.specialization
      ? [
          `${skill.specializationOptional ? t('specialization-optional') : t('specialization')}: ${t(skill.specialization)}`,
        ]
      : []),
  ];
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
      {chips.map((chip) => (
        <Chip key={chip} size="small" variant="outlined" label={chip} />
      ))}
    </Box>
  );
};

export default SkillProfile;
