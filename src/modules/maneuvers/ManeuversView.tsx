import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useSearchParams } from 'react-router-dom';
import { Autocomplete, Box, Grid, Stack, TextField } from '@mui/material';
import {
  fetchManeuverModifiers,
  fetchSkillCategories,
  fetchSkillDifficulty,
  fetchSkills,
  formatBonus,
  LayoutBase,
  ManeuverModifier,
  Section,
  SectionNav,
  Skill,
  SkillCategory,
  SkillDifficultyGuide,
  useNotify,
  useSectionParam,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import AbsoluteManeuverView from './AbsoluteManeuverView';
import EnduranceManeuverView from './EnduranceManeuverView';
import PercentManeuverView from './PercentManeuverView';
import SkillModifiersPanel from './shared/SkillModifiersPanel';
import SkillProfile from './shared/SkillProfile';
import { ModifierSelections, modifiersTotal } from './shared/skill-modifiers';

const TABS = ['absolute', 'percent', 'endurance'];
const GENERAL_GUIDE = 'general';

/**
 * Maneuvers (spec 037): an optional skill sets the result table and the tab from its maneuver profile, shows its
 * profile and catalog modifiers, and gives the difficulty picker its example difficulties (the general scale
 * without a skill). The skill, the tab and the difficulty are kept in the URL.
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
    fetchSkillCategories('', 0, 100, auth)
      .then((page) => setCategories(page.content))
      .catch((err) => notify.error(err));
  }, []);

  useEffect(() => {
    setSelections({});
    setModifiers([]);
    if (skillId) {
      fetchManeuverModifiers(skillId, auth)
        .then(setModifiers)
        .catch((err) => notify.error(err));
    }
    // The guides need Core Law: without access the picker simply has no examples.
    fetchSkillDifficulty(skillId ?? GENERAL_GUIDE, auth)
      .then(setGuide)
      .catch(() => setGuide(null));
  }, [skillId]);

  const sortedSkills = useMemo(
    () => [...skills].sort((a, b) => t(a.categoryId).localeCompare(t(b.categoryId)) || t(a.id).localeCompare(t(b.id))),
    [skills, t]
  );

  const onSkillChange = (value: Skill | null) => {
    setParam('skill', value?.id ?? null);
    if (value?.maneuver?.defaultType && tab !== 'endurance') setTab(value.maneuver.defaultType);
  };

  const skillModifiers = modifiersTotal(modifiers, selections);
  const modifiersPanel = skill ? (
    <Section title={`${t('skill-modifiers')}${skillModifiers ? ` (${formatBonus(skillModifiers)})` : ''}`}>
      <SkillModifiersPanel modifiers={modifiers} selections={selections} onChange={setSelections} />
    </Section>
  ) : undefined;
  const tabProps = {
    difficulty,
    onDifficultyChange: (value: string) => setParam('difficulty', value === 'm' ? null : value),
    guide,
    resultTable: skill?.maneuver?.resultTable,
    skillModifiers,
    modifiersPanel,
  };

  return (
    <LayoutBase
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('maneuvers') }]}
    >
      <Stack spacing={2}>
        <Section>
          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Autocomplete
                options={sortedSkills}
                value={skill}
                onChange={(_, value) => onSkillChange(value)}
                groupBy={(option) => t(option.categoryId)}
                getOptionLabel={(option) => t(option.id)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label={t('skill')} placeholder={t('select-skill')} />}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              {skill ? (
                <SkillProfile skill={skill} categoryStats={categoryStats} />
              ) : (
                <Box sx={{ color: 'text.secondary', typography: 'body2' }}>{t('maneuver-skill-hint')}</Box>
              )}
            </Grid>
          </Grid>
        </Section>

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
