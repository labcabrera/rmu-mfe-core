import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useSearchParams } from 'react-router-dom';
import { Autocomplete, Box, Grid, Stack, TextField, Typography } from '@mui/material';
import {
  fetchManeuverModifiers,
  fetchSkillCategories,
  fetchSkillDifficulty,
  fetchSkills,
  formatBonus,
  LayoutBase,
  ManeuverModifier,
  ManeuverModifierList,
  Section,
  SectionLabel,
  SectionNav,
  Skill,
  SkillCategory,
  SkillDifficultyGuide,
  useNotify,
  useSectionParam,
  fetchFullPage,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import AbsoluteManeuverView from './AbsoluteManeuverView';
import EnduranceManeuverView from './EnduranceManeuverView';
import PercentManeuverView from './PercentManeuverView';
import SkillModifiersPanel from './shared/SkillModifiersPanel';
import SkillProfile from './shared/SkillProfile';
import { completeDifficultyGuide } from './shared/difficulty-guide';
import { ModifierSelections, modifiersTotal } from './shared/skill-modifiers';

const TABS = ['absolute', 'percent', 'endurance'];
const GENERAL_GUIDE = 'general';

/**
 * Maneuvers (spec 037): an optional skill sets the result table and the tab from its maneuver profile, shows its
 * profile and catalog modifiers, and gives the difficulty picker its example difficulties (the general text where
 * the skill has none). The skill, the tab and the difficulty are kept in the URL.
 */
const ManeuversView: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useSectionParam(TABS, 'tab');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [modifiers, setModifiers] = useState<ManeuverModifier[]>([]);
  const [selections, setSelections] = useState<ModifierSelections>({});
  const [guide, setGuide] = useState<SkillDifficultyGuide | null>(null);
  const [generalGuide, setGeneralGuide] = useState<SkillDifficultyGuide | null>(null);

  const skillId = searchParams.get('skill');
  const difficulty = searchParams.get('difficulty') ?? 'm';
  const skill = skills.find((each) => each.id === skillId) ?? null;
  const categoryStats = categories.find((each) => each.id === skill?.categoryId)?.bonus ?? [];

  const setParam = (name: string, value: string | null) =>
    setSearchParams(
      (params) => {
        const next = new URLSearchParams(params);
        if (value) next.set(name, value);
        else next.delete(name);
        return next;
      },
      { replace: true }
    );

  useEffect(() => {
    fetchSkills('', 0, 500, auth)
      .then((page) => setSkills(page.content))
      .catch((err) => notify.error(err));
    fetchFullPage((rsql, page, size) => fetchSkillCategories(rsql, page, size, auth), '')
      .then((page) => setCategories(page.content))
      .catch((err) => notify.error(err));
    // The guides need Core Law: without access the picker simply has no examples.
    fetchSkillDifficulty(GENERAL_GUIDE, auth)
      .then(setGeneralGuide)
      .catch(() => setGeneralGuide(null));
  }, []);

  useEffect(() => {
    setSelections({});
    setModifiers([]);
    setGuide(null);
    if (skillId) {
      fetchManeuverModifiers(skillId, auth)
        .then(setModifiers)
        .catch((err) => notify.error(err));
      fetchSkillDifficulty(skillId, auth)
        .then(setGuide)
        .catch(() => setGuide(null));
    }
  }, [skillId]);

  const sortedSkills = useMemo(
    () => [...skills].sort((a, b) => t(a.categoryId).localeCompare(t(b.categoryId)) || t(a.id).localeCompare(t(b.id))),
    [skills, t]
  );

  // One single update: two calls to setSearchParams in the same tick would each start from the same URL, and the
  // second one would drop the skill.
  const onSkillChange = (value: Skill | null) =>
    setSearchParams(
      (params) => {
        const next = new URLSearchParams(params);
        if (value) next.set('skill', value.id);
        else next.delete('skill');
        const type = value?.maneuver?.defaultType;
        if (type && tab !== 'endurance') {
          if (type === TABS[0]) next.delete('tab');
          else next.set('tab', type);
        }
        return next;
      },
      { replace: true }
    );

  // Reference modifiers (OB/DB of combat skills) are listed apart and never added to the roll.
  const maneuverModifiers = modifiers.filter((modifier) => !modifier.reference);
  const referenceModifiers = modifiers.filter((modifier) => modifier.reference);
  const skillModifiers = modifiersTotal(maneuverModifiers, selections);
  const modifiersPanel = skill ? (
    <Section title={`${t('skill-modifiers')}${skillModifiers ? ` (${formatBonus(skillModifiers)})` : ''}`}>
      {(maneuverModifiers.length > 0 || referenceModifiers.length === 0) && (
        <SkillModifiersPanel modifiers={maneuverModifiers} selections={selections} onChange={setSelections} />
      )}
      {referenceModifiers.length > 0 && (
        <Box sx={{ mt: maneuverModifiers.length > 0 ? 2 : 0 }}>
          <SectionLabel>{t('combat-reference-modifiers')}</SectionLabel>
          <Typography variant="caption" color="text.secondary" component="div">
            {t('combat-reference-modifiers-hint')}
          </Typography>
          <ManeuverModifierList modifiers={referenceModifiers} />
        </Box>
      )}
    </Section>
  ) : undefined;
  const tabProps = {
    difficulty,
    onDifficultyChange: (value: string) => setParam('difficulty', value === 'm' ? null : value),
    guide: completeDifficultyGuide(guide, generalGuide),
    resultTable: skill?.maneuver?.resultTable,
    skillModifiers,
    modifiersPanel,
  };

  return (
    <LayoutBase
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('maneuvers') }]}
    >
      <Stack spacing={2}>
        {/* Same columns as the tabs below, so the skill and the fields under it share their width. */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Section>
              <Autocomplete
                options={sortedSkills}
                value={skill}
                onChange={(_, value) => onSkillChange(value)}
                groupBy={(option) => t(option.categoryId)}
                getOptionLabel={(option) => t(option.id)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label={t('skill')} placeholder={t('select-skill')} />}
              />
            </Section>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Section>
              <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 56 }}>
                {skill ? (
                  <SkillProfile skill={skill} categoryStats={categoryStats} />
                ) : (
                  <Box sx={{ color: 'text.secondary', typography: 'body2' }}>{t('maneuver-skill-hint')}</Box>
                )}
              </Box>
            </Section>
          </Grid>
        </Grid>

        <SectionNav
          sections={TABS.map((id) => ({ id, label: t(id) }))}
          value={tab}
          onChange={setTab}
          label={t('maneuvers')}
        />

        {tab === 'absolute' && <AbsoluteManeuverView {...tabProps} />}
        {tab === 'percent' && <PercentManeuverView {...tabProps} />}
        {tab === 'endurance' && <EnduranceManeuverView />}
      </Stack>
    </LayoutBase>
  );
};

export default ManeuversView;
