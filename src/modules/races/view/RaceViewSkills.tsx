/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Stack, Typography } from '@mui/material';
import {
  AddButton,
  bonusColor,
  DeleteButton,
  DeleteDialog,
  deleteRaceSkillBonus,
  fetchSkills,
  formatBonus,
  Panel,
  Race,
  RaceSkillBonus,
  useNotify,
  useSpecializationLabel,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import AddRaceSkillDialog from './skills/AddRaceSkillDialog';

/** Skills section of a race: its skill bonuses with sign, grouped by skill category. */
const RaceViewSkills: FC<{
  race: Race;
  setRace: (race: Race) => void;
}> = ({ race, setRace }) => {
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  // Spec 050: catalog keys shown by their name
  const specializationLabel = useSpecializationLabel();
  const notify = useNotify();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<RaceSkillBonus>();
  const [categoryOf, setCategoryOf] = useState<Map<string, string>>(new Map());
  const ids = [...new Set(race.skillBonuses.map((skill) => skill.skillId))].sort();

  useEffect(() => {
    if (ids.length === 0) return;
    fetchSkills(`id=in=(${ids.join(',')})`, 0, ids.length, auth)
      .then((response) => setCategoryOf(new Map(response.content.map((skill) => [skill.id, skill.categoryId]))))
      .catch(notify.error);
  }, [ids.join(',')]);

  const onDeleteSkill = () => {
    if (!skillToDelete) return;
    deleteRaceSkillBonus(race.id, skillToDelete.skillId, skillToDelete.specialization, auth)
      .then((response) => {
        setRace(response);
        setSkillToDelete(undefined);
      })
      .catch(notify.error);
  };

  const compare = (a: string, b: string) => a.localeCompare(b, i18n.language);
  const groups = new Map<string, RaceSkillBonus[]>();
  race.skillBonuses.forEach((skill) => {
    const category = categoryOf.get(skill.skillId) ?? '';
    groups.set(category, [...(groups.get(category) ?? []), skill]);
  });
  const sortedGroups = [...groups.entries()]
    .sort(([a], [b]) => (a && b ? compare(t(a), t(b)) : a ? -1 : 1))
    .map(([category, skills]) => [category, skills.sort((a, b) => compare(t(a.skillId), t(b.skillId)))] as const);

  return (
    <Panel title={t('skills')} extra={<AddButton onClick={() => setAddDialogOpen(true)} />}>
      {race.skillBonuses.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {t('race-has-no-skills')}
        </Typography>
      ) : (
        <Stack spacing={2}>
          {sortedGroups.map(([category, skills]) => (
            <Box key={category || 'other'}>
              <Typography variant="overline" color="text.secondary" component="div">
                {category ? (
                  <Link component={RouterLink} to={`/core/skill-categories/view/${category}`} underline="hover">
                    {t(category)}
                  </Link>
                ) : (
                  t('other')
                )}
              </Typography>
              <Stack divider={<Box sx={{ borderBottom: 1, borderColor: 'divider' }} />}>
                {skills.map((skill) => (
                  <Stack
                    key={`${skill.skillId}-${skill.specialization ?? ''}`}
                    direction="row"
                    sx={{ alignItems: 'center', gap: 1, py: 0.5 }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Link
                        component={RouterLink}
                        to={`/core/skills/view/${skill.skillId}`}
                        underline="hover"
                        color="inherit"
                        variant="body2"
                        sx={{ fontWeight: 600 }}
                      >
                        {t(skill.skillId)}
                      </Link>
                      {skill.specialization && (
                        <Typography variant="caption" color="text.secondary" component="div">
                          {specializationLabel(skill.specialization)}
                        </Typography>
                      )}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: bonusColor(skill.bonus) }}>
                      {formatBonus(skill.bonus)}
                    </Typography>
                    <DeleteButton onClick={() => setSkillToDelete(skill)} />
                  </Stack>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
      <AddRaceSkillDialog race={race} setRace={setRace} open={addDialogOpen} onClose={() => setAddDialogOpen(false)} />
      <DeleteDialog
        message={t('confirmation-delete-message')}
        open={Boolean(skillToDelete)}
        onDelete={onDeleteSkill}
        onClose={() => setSkillToDelete(undefined)}
      />
    </Panel>
  );
};

export default RaceViewSkills;
