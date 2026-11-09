import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { Box, Chip, Link, Stack, Tab, Tabs, Typography } from '@mui/material';
import {
  DataTable,
  DataTableColumn,
  EmptyState,
  FIGHTING_STYLE_SKILLS,
  FightingStyle,
  FightingStyles,
  FightingStyleSkill,
  fetchFightingStyles,
  LayoutBase,
  LoadingState,
  SearchField,
  Section,
  StyleAbility,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { TFunction } from 'i18next';
import { equipmentLabel } from './style-conditions';

/**
 * Fighting styles of the catalog (spec 032), read only: the three style skills, the styles that are their
 * specializations, and the abilities each style gives with their cost in ranks.
 */
const FightingStylesView: FC = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const notify = useNotify();
  const [catalog, setCatalog] = useState<FightingStyles>();
  // The tab lives in the URL, so going back from an ability returns to it
  const [params, setParams] = useSearchParams();
  const skill = FIGHTING_STYLE_SKILLS.find((id) => id === params.get('skill')) ?? FIGHTING_STYLE_SKILLS[0];
  const setSkill = (value: FightingStyleSkill) => setParams({ skill: value }, { replace: true });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchFightingStyles(auth)
      .then(setCatalog)
      .catch((err) => notify.error(err));
  }, []);

  const abilities = useMemo(() => new Map((catalog?.abilities ?? []).map((a) => [a.id, a])), [catalog]);
  const needle = filter.trim().toLowerCase();
  const styles = (catalog?.styles ?? [])
    .filter((style) => style.skillId === skill)
    .filter(
      (style) =>
        !needle ||
        t(style.id).toLowerCase().includes(needle) ||
        style.abilities.some((a) => t(`style-ability-${a.abilityId}`).toLowerCase().includes(needle))
    )
    .sort((a, b) => t(a.id).localeCompare(t(b.id)));

  return (
    <LayoutBase
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('fighting-styles') }]}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={1.5}
        sx={{ justifyContent: 'space-between', alignItems: { md: 'center' }, mb: 2 }}
      >
        <Tabs value={skill} onChange={(_, value: FightingStyleSkill) => setSkill(value)} variant="scrollable">
          {FIGHTING_STYLE_SKILLS.map((id) => (
            <Tab key={id} value={id} label={t(id)} />
          ))}
        </Tabs>
        <Box sx={{ width: { xs: '100%', md: 300 } }}>
          <SearchField
            value={filter}
            onChange={setFilter}
            placeholder={t('search-fighting-style')}
            delay={0}
            size="small"
          />
        </Box>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {t('fighting-styles-help')}
      </Typography>
      {!catalog ? (
        <LoadingState />
      ) : styles.length === 0 ? (
        <EmptyState dense title={t('fighting-styles-not-found')} />
      ) : (
        <Stack spacing={2}>
          {styles.map((style) => (
            <StyleCard key={style.id} style={style} abilities={abilities} />
          ))}
        </Stack>
      )}
    </LayoutBase>
  );
};

const StyleCard: FC<{ style: FightingStyle; abilities: Map<string, StyleAbility> }> = ({ style, abilities }) => {
  const { t } = useTranslation();
  const requirements = [
    ...style.requiresSkills.map((id) => t(id.split('@')[0])),
    ...style.requiresTraits.map((id) => t(id)),
  ];

  const entries = [...style.abilities].sort((a, b) =>
    t(`style-ability-${a.abilityId}`).localeCompare(t(`style-ability-${b.abilityId}`))
  );
  // The same columns in every style (fixed widths); on phones each ability is a card.
  const columns: DataTableColumn<(typeof entries)[number]>[] = [
    {
      key: 'ability',
      header: t('style-ability'),
      width: '38%',
      render: (entry) => {
        const ability = abilities.get(entry.abilityId);
        return (
          <>
            <Link component={RouterLink} to={`/core/fighting-styles/abilities/${entry.abilityId}`}>
              {t(`style-ability-${entry.abilityId}`)}
            </Link>
            {ability?.repeatable && (
              <Chip
                size="small"
                variant="outlined"
                sx={{ ml: 1 }}
                label={
                  ability.maxTimes
                    ? t('style-ability-repeatable-max', { times: ability.maxTimes })
                    : t('style-ability-repeatable')
                }
              />
            )}
          </>
        );
      },
    },
    { key: 'cost', header: t('cost'), align: 'right', width: 88, render: (entry) => entry.cost },
    {
      key: 'requirements',
      header: t('requirements'),
      cellSx: { color: 'text.secondary' },
      render: (entry) => {
        const ability = abilities.get(entry.abilityId);
        return ability ? abilityRequirements(ability, t) : '';
      },
    },
  ];

  return (
    <Section title={t(style.id)}>
      <Box
        component="dl"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'max-content 1fr',
          columnGap: 2,
          rowGap: 0.5,
          mt: 0,
          mb: 2,
          '& dt': { color: 'text.secondary' },
          '& dd': { m: 0 },
        }}
      >
        <Typography component="dt">{t('equipment')}</Typography>
        <Typography component="dd">{equipmentLabel(style.equipment, t)}</Typography>
        {requirements.length > 0 && (
          <>
            <Typography component="dt">{t('requirements')}</Typography>
            <Typography component="dd">{requirements.join(', ')}</Typography>
          </>
        )}
      </Box>
      <DataTable columns={columns} rows={entries} getKey={(entry) => entry.abilityId} />
    </Section>
  );
};

const abilityRequirements = (ability: StyleAbility, t: TFunction): string => {
  const parts = [
    ...ability.requiresAbilities.map((id) => t(`style-ability-${id}`)),
    ...ability.requiresSkills.map((id) => t(id.split('@')[0])),
    ...ability.requiresTraits.map((id) => t(id)),
  ];
  if (ability.equipment.length > 0) parts.push(equipmentLabel(ability.equipment, t));
  return parts.length > 0 ? parts.join(' · ') : '-';
};

export default FightingStylesView;
