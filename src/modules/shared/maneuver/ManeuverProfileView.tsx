import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { imageBaseUrl, ManeuverProfileOverrides, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';

type ProfileField = keyof ManeuverProfileOverrides;

const image = `${imageBaseUrl}images/generic/configuration.png`;

/**
 * Read-only maneuver profile (spec 010). With `overrides`, the fields the skill defines itself are
 * marked as overrides and the rest as inherited from the category.
 */
const ManeuverProfileView: FC<{
  profile: ManeuverProfileOverrides;
  overrides?: ManeuverProfileOverrides;
}> = ({ profile, overrides }) => {
  const { t } = useTranslation();

  const subtitle = (field: ProfileField, label: string): string => {
    if (!overrides) return label;
    const origin = overrides[field] !== undefined ? 'maneuver-skill-override' : 'maneuver-inherited-from-category';
    return `${label} · ${t(origin)}`;
  };

  const cards: { field: ProfileField; label: string; value: string }[] = [];
  if (profile.defaultType !== undefined) {
    cards.push({
      field: 'defaultType',
      label: t('default-maneuver-type'),
      value: t(`maneuver-type-${profile.defaultType}`),
    });
  }
  if (profile.resultTable !== undefined) {
    cards.push({
      field: 'resultTable',
      label: t('result-table'),
      value: t(profile.resultTable, { defaultValue: profile.resultTable }),
    });
  }
  if (profile.movement !== undefined) {
    cards.push({ field: 'movement', label: t('requires-movement'), value: t(profile.movement ? 'yes' : 'no') });
  }
  if (profile.light !== undefined) {
    cards.push({ field: 'light', label: t('light-usage'), value: t(`light-usage-${profile.light}`) });
  }
  if (profile.actionPoints) {
    cards.push({
      field: 'actionPoints',
      label: t('action-points-range'),
      value: `${profile.actionPoints.min} - ${profile.actionPoints.max}`,
    });
  }

  return (
    <Grid container spacing={1}>
      {cards.map((card) => (
        <Grid key={card.field} size={{ xs: 12, md: 3 }}>
          <RmuTextCard value={card.value} subtitle={subtitle(card.field, card.label)} image={image} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ManeuverProfileView;
