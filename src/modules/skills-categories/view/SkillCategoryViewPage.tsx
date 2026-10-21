/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import {
  AddButton,
  DetailPage,
  EntityCard,
  fetchManeuverModifiersByCategory,
  fetchSkillCategory,
  fetchSkills,
  ManeuverModifier,
  ManeuverModifierList,
  ManeuverProfilePanel,
  Panel,
  Skill,
  SkillCategory,
  useEntity,
  useNotify,
  useViewTransitionNavigate,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import StatChips from '../../shared/display/StatChips';
import { Bento, span } from '../../shared/layout/Bento';

const hasProfile = (category: SkillCategory) => Boolean(category.maneuver && Object.keys(category.maneuver).length > 0);

export default function SkillCategoryViewPage() {
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const transitionNavigate = useViewTransitionNavigate();
  const notify = useNotify();
  const { skillCategoryId } = useParams<{ skillCategoryId?: string }>();
  const state = useEntity<SkillCategory>(skillCategoryId, (id) => fetchSkillCategory(id, auth), {
    initial: location.state?.skillCategory,
    onError: notify.error,
  });
  const skillCategory = state.entity;
  const [skills, setSkills] = useState<Skill[]>([]);
  const [modifiers, setModifiers] = useState<ManeuverModifier[]>([]);

  useEffect(() => {
    if (!skillCategory?.id) return;
    fetchSkills(`categoryId==${skillCategory.id}`, 0, 100, auth)
      .then((response) =>
        setSkills([...response.content].sort((a, b) => t(a.id).localeCompare(t(b.id), i18n.language)))
      )
      .catch(notify.error);
    fetchManeuverModifiersByCategory(skillCategory.id, auth).then(setModifiers).catch(notify.error);
  }, [skillCategory?.id]);

  const descriptionKey = (category: SkillCategory) => `skill-category-${category.id}-description`;

  return (
    <DetailPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('skill-categories'), link: '/core/skill-categories' },
        { name: skillCategory ? t(skillCategory.id) : t('view') },
      ]}
      entity={state}
      technicalInfo={false}
      hero={(category) => ({
        title: t(category.id),
        overline: t('skill-category'),
        chips: [<StatChips key="stats" stats={category.bonus} realmBonus={category.realmBonus} />],
      })}
    >
      {(category) => (
        <Bento>
          <Box sx={span(12, hasProfile(category) ? 7 : 12)}>
            <Panel title={t('description')}>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {i18n.exists(descriptionKey(category)) ? t(descriptionKey(category)) : t('no-description')}
              </Typography>
            </Panel>
          </Box>
          {hasProfile(category) && (
            <Box sx={span(12, 5)}>
              <ManeuverProfilePanel profile={category.maneuver} title={t('maneuver-roll')} />
            </Box>
          )}
          {modifiers.length > 0 && (
            <Box sx={span(12, 12)}>
              <Panel title={t('maneuver-modifiers')}>
                <ManeuverModifierList modifiers={modifiers} />
              </Panel>
            </Box>
          )}
          <Box sx={span(12, 12)}>
            <Panel title={t('skills')} extra={<AddButton onClick={() => navigate('/core/skills/create')} />}>
              {skills.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  {t('no-results')}
                </Typography>
              ) : (
                <Box
                  sx={{
                    display: 'grid',
                    gap: 1.5,
                    gridTemplateColumns: {
                      xs: 'minmax(0, 1fr)',
                      sm: 'repeat(2, minmax(0, 1fr))',
                      lg: 'repeat(4, minmax(0, 1fr))',
                    },
                  }}
                >
                  {skills.map((skill) => (
                    <EntityCard
                      key={skill.id}
                      title={t(skill.id)}
                      subtitle={skill.specialization ? t(skill.specialization) : undefined}
                      imageRatio="none"
                      chips={<StatChips stats={skill.bonus} realmBonus={skill.realmBonus} />}
                      onClick={() => transitionNavigate(`/core/skills/view/${skill.id}`, { state: { skill } })}
                    />
                  ))}
                </Box>
              )}
            </Panel>
          </Box>
        </Bento>
      )}
    </DetailPage>
  );
}
