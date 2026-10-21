/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Chip, Link, Stack, Tooltip, Typography } from '@mui/material';
import {
  deleteSkill,
  DetailPage,
  Enumeration,
  fetchEnumerations,
  fetchManeuverModifiers,
  fetchManeuverModifiersByCategory,
  fetchSkill,
  formatBonus,
  ManeuverModifier,
  ManeuverModifierList,
  ManeuverModifierWithOrigin,
  ManeuverProfile,
  ManeuverProfilePanel,
  Panel,
  Skill,
  StatPill,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import StatChips from '../../shared/display/StatChips';
import { Bento, span } from '../../shared/layout/Bento';
import { skillDescriptionKey } from '../skill-utils';

/** Bonus of a character without ranks in the skill (chapter 3), applied by tactical to maneuvers. */
const UNSKILLED_BONUS = -25;

/**
 * The skill's modifiers and its category's, without repeats. The skill endpoint already includes the category
 * ones; the category endpoint is merged too so none is missed. A modifier is the skill's when its scope names it.
 */
const mergeModifiers = (
  skill: Skill,
  own: ManeuverModifier[],
  category: ManeuverModifier[]
): ManeuverModifierWithOrigin[] => {
  const byId = new Map<string, ManeuverModifier>();
  [...own, ...category].forEach((modifier) => byId.set(modifier.id, modifier));
  return [...byId.values()]
    .map((modifier) => ({
      ...modifier,
      origin: modifier.scope?.skillIds?.includes(skill.id) ? ('skill' as const) : ('category' as const),
    }))
    .sort((a, b) => (a.origin === b.origin ? a.key.localeCompare(b.key) : a.origin === 'skill' ? -1 : 1));
};

/** What tactical applies on its own to a maneuver with this profile (spec 012 §3.5). */
const BaseModifiersNote = ({ profile }: { profile: ManeuverProfile }) => {
  const { t } = useTranslation();
  const lines = [
    t('maneuver-base-note-penalties'),
    t('maneuver-base-note-unskilled', { value: formatBonus(UNSKILLED_BONUS) }),
    ...(profile.movement ? [t('maneuver-base-note-movement')] : []),
    ...(profile.light && profile.light !== 'none'
      ? [t('maneuver-base-note-light', { usage: t(`light-usage-${profile.light}`) })]
      : []),
    ...(profile.actionPoints
      ? [t('maneuver-base-note-action-points', { max: profile.actionPoints.max, value: formatBonus(-25) })]
      : []),
  ];
  return (
    <Stack spacing={1}>
      <Typography variant="body2" color="text.secondary">
        {t('maneuver-base-note-intro')}
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
        {lines.map((line) => (
          <Typography key={line} component="li" variant="body2" sx={{ py: 0.25 }}>
            {line}
          </Typography>
        ))}
      </Box>
    </Stack>
  );
};

export default function SkillViewPage() {
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { skillId } = useParams<{ skillId?: string }>();
  const state = useEntity<Skill>(skillId, (id) => fetchSkill(id, auth), {
    initial: location.state?.skill,
    onError: notify.error,
  });
  const skill = state.entity;
  const [enumerations, setEnumerations] = useState<Enumeration[]>([]);
  const [modifiers, setModifiers] = useState<ManeuverModifierWithOrigin[]>([]);

  useEffect(() => {
    if (!skill?.specialization) {
      setEnumerations([]);
      return;
    }
    fetchEnumerations(`category==${skill.specialization}`, 0, 100, auth)
      .then((response) => setEnumerations(response.content))
      .catch(notify.error);
  }, [skill?.specialization]);

  useEffect(() => {
    if (!skill?.id) return;
    Promise.all([fetchManeuverModifiers(skill.id, auth), fetchManeuverModifiersByCategory(skill.categoryId, auth)])
      .then(([own, category]) => setModifiers(mergeModifiers(skill, own, category)))
      .catch(notify.error);
  }, [skill?.id, skill?.categoryId]);

  const onDelete = (entity: Skill) =>
    deleteSkill(entity.id, auth)
      .then(() => navigate(`/core/skill-categories/view/${entity.categoryId}`))
      .catch(notify.error);

  const description = (entity: Skill) =>
    i18n.exists(skillDescriptionKey(entity))
      ? t(skillDescriptionKey(entity))
      : t('this-skill-has-no-associated-description');

  return (
    <DetailPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('skills'), link: '/core/skills' },
        { name: skill ? t(skill.id) : t('view') },
      ]}
      entity={state}
      technicalInfo={false}
      onEdit={(entity) => navigate(`/core/skills/edit/${entity.id}`, { state: { skill: entity } })}
      onDelete={onDelete}
      hero={(entity) => ({
        title: t(entity.id),
        overline: (
          <Link component={RouterLink} to={`/core/skill-categories/view/${entity.categoryId}`} underline="hover">
            {t(entity.categoryId)}
          </Link>
        ),
        chips: [
          <StatChips key="stats" stats={entity.bonus} realmBonus={entity.realmBonus} />,
          ...(entity.specialization
            ? [
                <Chip
                  key="specialization"
                  size="small"
                  variant="outlined"
                  label={`${t('specialization')}: ${t(entity.specialization)}`}
                  onClick={() => navigate(`/core/catalogs/view/${entity.specialization}`)}
                />,
              ]
            : []),
          ...(entity.maneuver
            ? [
                <Tooltip key="unskilled" title={t('unskilled-maneuver-hint')}>
                  <Chip
                    size="small"
                    color="warning"
                    variant="outlined"
                    label={t('unskilled-bonus', { value: formatBonus(UNSKILLED_BONUS) })}
                  />
                </Tooltip>,
              ]
            : []),
        ],
        pills: entity.maneuver
          ? [
              <StatPill
                key="type"
                label={t('default-maneuver-type')}
                value={t(`maneuver-type-${entity.maneuver.defaultType}`)}
              />,
              ...(entity.maneuver.actionPoints
                ? [
                    <StatPill
                      key="ap"
                      label={t('action-points-range')}
                      value={`${entity.maneuver.actionPoints.min}-${entity.maneuver.actionPoints.max}`}
                    />,
                  ]
                : []),
            ]
          : undefined,
      })}
    >
      {(entity) => (
        <Bento>
          <Box sx={span(12, entity.maneuver ? 7 : 12)}>
            <Panel title={t('description')}>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {description(entity)}
              </Typography>
            </Panel>
          </Box>
          {entity.maneuver && (
            <Box sx={span(12, 5)}>
              <ManeuverProfilePanel
                profile={entity.maneuver}
                overrides={entity.maneuverOverrides || {}}
                title={t('maneuver-roll')}
              />
            </Box>
          )}
          {entity.specialization && (
            <Box sx={span(12, 12)}>
              <Panel title={t('available-specializations')}>
                {enumerations.length > 0 ? (
                  <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 0.75 }}>
                    {enumerations.map((enumeration) => (
                      <Chip key={enumeration.id} label={t(enumeration.key)} variant="outlined" />
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    {t('no-results')}
                  </Typography>
                )}
              </Panel>
            </Box>
          )}
          {modifiers.length > 0 && (
            <Box sx={span(12, entity.maneuver ? 7 : 12)}>
              <Panel title={t('maneuver-modifiers')}>
                <ManeuverModifierList modifiers={modifiers} />
              </Panel>
            </Box>
          )}
          {entity.maneuver && (
            <Box sx={span(12, modifiers.length > 0 ? 5 : 12)}>
              <Panel title={t('maneuver-base-modifiers')}>
                <BaseModifiersNote profile={entity.maneuver} />
              </Panel>
            </Box>
          )}
        </Bento>
      )}
    </DetailPage>
  );
}
