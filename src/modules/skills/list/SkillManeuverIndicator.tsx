import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LightModeIcon from '@mui/icons-material/LightMode';
import PercentIcon from '@mui/icons-material/Percent';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { ManeuverProfile } from '@labcabrera-rmu/rmu-react-shared-lib';

/**
 * Compact maneuver profile of a skill for the list: an icon with the default type (absolute or percent) and
 * markers when the profile uses movement or light. The tooltip spells it out. Nothing without a profile.
 */
const SkillManeuverIndicator: FC<{ profile?: ManeuverProfile }> = ({ profile }) => {
  const { t } = useTranslation();
  if (!profile) {
    return (
      <Typography variant="body2" color="text.disabled" component="span">
        -
      </Typography>
    );
  }
  const TypeIcon = profile.defaultType === 'percent' ? PercentIcon : TaskAltIcon;
  const lines = [
    `${t('default-maneuver-type')}: ${t(`maneuver-type-${profile.defaultType}`)}`,
    ...(profile.movement ? [t('maneuver-movement-hint')] : []),
    ...(profile.light && profile.light !== 'none' ? [`${t('light-usage')}: ${t(`light-usage-${profile.light}`)}`] : []),
    ...(profile.actionPoints
      ? [`${t('action-points-range')}: ${profile.actionPoints.min} - ${profile.actionPoints.max}`]
      : []),
  ];
  return (
    <Tooltip
      title={
        <Box>
          {lines.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </Box>
      }
    >
      <Stack
        direction="row"
        spacing={0.5}
        aria-label={lines.join('. ')}
        sx={{ alignItems: 'center', color: 'text.secondary', display: 'inline-flex' }}
      >
        <TypeIcon fontSize="small" color="primary" />
        {profile.movement && <DirectionsRunIcon fontSize="small" />}
        {profile.light && profile.light !== 'none' && <LightModeIcon fontSize="small" />}
      </Stack>
    </Tooltip>
  );
};

export default SkillManeuverIndicator;
