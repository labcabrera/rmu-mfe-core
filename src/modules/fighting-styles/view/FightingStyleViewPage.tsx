import { FC, ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Divider, Stack, Typography } from '@mui/material';
import {
  EmptyState,
  ErrorState,
  LayoutBase,
  LoadingState,
  Section,
  StyleAbility,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { equipmentLabel } from '../style-conditions';
import { useFightingStyles } from '../useFightingStyles';
import StyleAbilityEntry from './StyleAbilityEntry';

/** Workspace spec 092: everything about a fighting style in one page, the text of its abilities included. */
const FightingStyleViewPage: FC = () => {
  const { t } = useTranslation();
  const { styleId } = useParams<{ styleId: string }>();
  const location = useLocation();
  const catalog = useFightingStyles();
  const style = catalog.data?.styles.find((candidate) => candidate.id === styleId);

  const entries = useMemo(() => {
    const abilities = new Map<string, StyleAbility>((catalog.data?.abilities ?? []).map((a) => [a.id, a]));
    return (style?.abilities ?? [])
      .flatMap((entry) => {
        const ability = abilities.get(entry.abilityId);
        return ability ? [{ ability, cost: entry.cost }] : [];
      })
      .sort((a, b) => t(`style-ability-${a.ability.id}`).localeCompare(t(`style-ability-${b.ability.id}`)));
  }, [catalog.data, style, t]);

  // Back to the list as it was: the filters are in the URL.
  const from = (location.state as { from?: string } | null)?.from ?? '';
  const requirements = style
    ? [...style.requiresSkills.map((id) => t(id.split('@')[0])), ...style.requiresTraits.map((id) => t(id))]
    : [];

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('fighting-styles'), link: `/core/fighting-styles${from}` },
        { name: styleId ? t(styleId) : '' },
      ]}
    >
      {catalog.error ? (
        <ErrorState error={catalog.error} onRetry={() => void catalog.refetch()} />
      ) : !catalog.data ? (
        <LoadingState />
      ) : !style ? (
        <EmptyState dense title={t('fighting-styles-not-found')} />
      ) : (
        <Stack spacing={2} sx={{ maxWidth: 900 }}>
          <Section title={t(style.id)}>
            <Stack spacing={0.5} sx={{ mb: 1.5 }}>
              <Field label={t('fighting-style-type')}>{t(style.skillId)}</Field>
              <Field label={t('equipment')}>{equipmentLabel(style.equipment, t)}</Field>
              {requirements.length > 0 && <Field label={t('requirements')}>{requirements.join(', ')}</Field>}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {t('fighting-styles-help')}
            </Typography>
          </Section>
          <Section title={t('style-abilities')}>
            <Stack spacing={2.5} divider={<Divider />}>
              {entries.map(({ ability, cost }) => (
                <StyleAbilityEntry key={ability.id} ability={ability} cost={cost} />
              ))}
            </Stack>
          </Section>
        </Stack>
      )}
    </LayoutBase>
  );
};

const Field: FC<{ label: string; children: ReactNode }> = ({ label, children }) => (
  <Typography variant="body2">
    <Box component="span" sx={{ color: 'text.secondary' }}>
      {label}:{' '}
    </Box>
    {children}
  </Typography>
);

export default FightingStyleViewPage;
