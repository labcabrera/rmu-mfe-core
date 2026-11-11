import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Chip, Link, Stack, Typography } from '@mui/material';
import { ChipRow, StyleAbility } from '@labcabrera-rmu/rmu-react-shared-lib';
import RulesText from '../RulesText';
import { abilityRequirements, equipmentLabel } from '../style-conditions';
import { useStyleAbilityText } from '../useStyleAbilityText';

/** One ability inside the page of a style (spec 092): what it costs, what it needs and what it does. */
const StyleAbilityEntry: FC<{ ability: StyleAbility; cost: number }> = ({ ability, cost }) => {
  const { t } = useTranslation();
  const abilityText = useStyleAbilityText();
  const text = abilityText(ability);
  const requirements = abilityRequirements(ability, t);

  return (
    <Box component="article">
      <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap', mb: 0.5 }}>
        <Typography variant="h6" component="h3">
          <Link component={RouterLink} to={`/core/fighting-styles/abilities/${ability.id}`} underline="hover">
            {t(`style-ability-${ability.id}`)}
          </Link>
        </Typography>
        <ChipRow>
          <Chip size="small" color="primary" label={t('fighting-style-cost', { cost })} />
          {ability.repeatable && (
            <Chip
              size="small"
              variant="outlined"
              label={
                ability.maxTimes
                  ? t('style-ability-repeatable-max', { times: ability.maxTimes })
                  : t('style-ability-repeatable')
              }
            />
          )}
        </ChipRow>
      </Stack>
      {requirements.length > 0 && (
        <Typography variant="body2" color="text.secondary">
          {t('requirements')}: {requirements.join(' · ')}
        </Typography>
      )}
      {ability.equipment.length > 0 && (
        <Typography variant="body2" color="text.secondary">
          {t('equipment')}: {equipmentLabel(ability.equipment, t)}
        </Typography>
      )}
      <Box sx={{ mt: 1 }}>
        {text ? (
          <RulesText text={text} />
        ) : (
          <Typography color="text.secondary">{t('style-ability-no-description')}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default StyleAbilityEntry;
