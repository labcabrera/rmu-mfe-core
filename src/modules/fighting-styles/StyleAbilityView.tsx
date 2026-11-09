import { FC, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Box, Chip, Link, Stack, Typography } from '@mui/material';
import {
  ChipRow,
  DataTable,
  DataTableColumn,
  EmptyState,
  FightingStyle,
  LayoutBase,
  LoadingState,
  Section,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import RulesText from './RulesText';
import { equipmentLabel } from './style-conditions';
import { useFightingStyles } from './useFightingStyles';
import { useStyleAbilityText } from './useStyleAbilityText';

/** One ability of the fighting styles catalog (spec 032): its requirements, the styles that grant it and its text. */
const StyleAbilityView: FC = () => {
  const { t } = useTranslation();
  const abilityText = useStyleAbilityText();
  const notify = useNotify();
  const { abilityId } = useParams<{ abilityId: string }>();
  const { data: catalog, error } = useFightingStyles();

  useEffect(() => {
    if (error) notify.error(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const ability = catalog?.abilities.find((a) => a.id === abilityId);
  const grantedBy = (catalog?.styles ?? [])
    .flatMap((style) => style.abilities.filter((a) => a.abilityId === abilityId).map((a) => ({ style, cost: a.cost })))
    .sort((a, b) => t(a.style.id).localeCompare(t(b.style.id)));
  const grantedColumns: DataTableColumn<{ style: FightingStyle; cost: number }>[] = [
    {
      key: 'style',
      header: t('fighting-style'),
      render: ({ style }) => (
        <Link component={RouterLink} to={`/core/fighting-styles/view/${style.id}`}>
          {t(style.id)}
        </Link>
      ),
    },
    { key: 'skill', header: t('skill'), render: ({ style }) => t(style.skillId) },
    { key: 'cost', header: t('cost'), align: 'right', render: ({ cost }) => cost },
  ];
  const abilityLink = (id: string) => (
    <Link key={id} component={RouterLink} to={`/core/fighting-styles/abilities/${id}`}>
      {t(`style-ability-${id}`)}
    </Link>
  );

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('fighting-styles'), link: '/core/fighting-styles' },
        { name: abilityId ? t(`style-ability-${abilityId}`) : '' },
      ]}
    >
      {!catalog ? (
        <LoadingState />
      ) : !ability ? (
        <EmptyState dense title={t('style-ability-not-found')} />
      ) : (
        <Stack spacing={2} sx={{ maxWidth: 900 }}>
          <Section title={t(`style-ability-${ability.id}`)}>
            <ChipRow sx={{ mb: 1.5 }}>
              {ability.types.map((type) => (
                <Chip key={type} size="small" label={t(`style-ability-type-${type}`)} />
              ))}
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
            <Stack spacing={0.5}>
              <Field label={t('equipment')}>{equipmentLabel(ability.equipment, t)}</Field>
              {ability.requiresAbilities.length > 0 && (
                <Field label={t('style-ability-required-abilities')}>
                  {ability.requiresAbilities.map((id, index) => [index > 0 && ', ', abilityLink(id)])}
                </Field>
              )}
              {ability.requiresSkills.length + ability.requiresTraits.length > 0 && (
                <Field label={t('requirements')}>
                  {[
                    ...ability.requiresSkills.map((id) => t(id.split('@')[0])),
                    ...ability.requiresTraits.map((id) => t(id)),
                  ].join(', ')}
                </Field>
              )}
            </Stack>
          </Section>

          <Section title={t('style-ability-granted-by')}>
            <DataTable
              columns={grantedColumns}
              rows={grantedBy}
              getKey={({ style }) => `${style.skillId}-${style.id}`}
            />
          </Section>

          <Section title={t('style-ability-rules-text')}>
            {abilityText(ability) ? (
              <RulesText text={abilityText(ability)} />
            ) : (
              <EmptyState dense title={t('style-ability-no-description')} />
            )}
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

export default StyleAbilityView;
