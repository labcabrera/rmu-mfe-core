import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Grid, MenuItem, TextField } from '@mui/material';
import {
  CultureRegion,
  CultureSkillRank,
  CultureSkillRankType,
  EntitySelect,
  fetchSkillCategories,
  fetchSkills,
  NumericInput,
  RmuDialog,
  Skill,
  SkillSelector,
  TechnicalInfo,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import MultiIdSelect from './MultiIdSelect';
import {
  CULTURE_REGIONS,
  CULTURE_SKILL_RANK_TYPES,
  cultureRegionLabel,
  cultureSkillRankTypeLabel,
  isValidCultureSkillRank,
  normalizeCultureSkillRank,
} from './culture-skill-ranks';

const EMPTY_ENTRY: CultureSkillRank = { type: 'skill', ranks: 1 };

/**
 * Dialog that builds one typed culture skill rank entry. The caller decides what adding means: the view
 * appends it through the API and the form keeps it in the local list.
 */
const AddCultureSkillRankDialog: FC<{
  open: boolean;
  onAdd: (entry: CultureSkillRank) => Promise<unknown> | void;
  onClose: () => void;
}> = ({ open, onAdd, onClose }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [entry, setEntry] = useState<CultureSkillRank>(EMPTY_ENTRY);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open || skills.length > 0) return;
    fetchSkills('', 0, 500, auth)
      .then((page) => setSkills(page.content))
      .catch(notify.error);
    fetchSkillCategories('', 0, 100, auth)
      .then((page) => setCategoryIds(page.content.map((category) => category.id)))
      .catch(notify.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    setEntry(EMPTY_ENTRY);
    onClose();
  };

  const onConfirm = () => {
    const result = onAdd(normalizeCultureSkillRank(entry));
    if (!result) {
      close();
      return;
    }
    setSaving(true);
    Promise.resolve(result)
      .then(close)
      .catch(notify.error)
      .finally(() => setSaving(false));
  };

  const changeType = (type: CultureSkillRankType) => setEntry({ type, ranks: entry.ranks });

  const skillIds = skills.map((skill) => skill.id);
  const usesMaxRanks = entry.type === 'skill-choice' || entry.type === 'category-pool';

  return (
    <RmuDialog
      title={t('add-culture-skill-rank')}
      maxWidth="md"
      open={open}
      onCancel={close}
      onConfirm={onConfirm}
      onConfirmDisabled={saving || !isValidCultureSkillRank(entry)}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            label={t('type')}
            value={entry.type}
            onChange={(e) => changeType(e.target.value as CultureSkillRankType)}
            fullWidth
          >
            {CULTURE_SKILL_RANK_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {cultureSkillRankTypeLabel(type, t)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <NumericInput
            label={t('ranks')}
            value={entry.ranks}
            integer
            min={1}
            error={!entry.ranks}
            onChange={(v) => setEntry({ ...entry, ranks: v || 0 })}
          />
        </Grid>
        {usesMaxRanks && (
          <Grid size={{ xs: 6, md: 3 }}>
            <NumericInput
              label={t('max-ranks-per-skill')}
              value={entry.maxRanksPerSkill}
              integer
              min={1}
              onChange={(v) => setEntry({ ...entry, maxRanksPerSkill: v || undefined })}
            />
          </Grid>
        )}
        {entry.type === 'skill' && (
          <Grid size={12}>
            <SkillSelector
              key={`skill-selector-${open}`}
              onSkillChange={(skillId) => setEntry((prev) => ({ ...prev, skillId: skillId || undefined }))}
              onSpecializationChange={(specialization) =>
                setEntry((prev) => ({ ...prev, specialization: specialization || undefined }))
              }
              onError={notify.error}
            />
          </Grid>
        )}
        {entry.type === 'skill-choice' && (
          <Grid size={12}>
            <MultiIdSelect
              label={t('skills')}
              options={skillIds}
              value={entry.skillIds || []}
              onChange={(ids) => setEntry({ ...entry, skillIds: ids })}
              required
            />
          </Grid>
        )}
        {entry.type === 'category-pool' && (
          <Grid size={12}>
            <MultiIdSelect
              label={t('skill-categories')}
              options={categoryIds}
              value={entry.categoryIds || []}
              onChange={(ids) => setEntry({ ...entry, categoryIds: ids })}
              required
            />
          </Grid>
        )}
        {entry.type === 'region' && (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <EntitySelect<Skill>
                label={t('skill')}
                options={skills}
                value={entry.skillId}
                getLabel={(skill) => t(skill.id)}
                onChange={(skillId) => setEntry({ ...entry, skillId: skillId || undefined })}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                label={t('region')}
                value={entry.region || ''}
                onChange={(e) => setEntry({ ...entry, region: e.target.value as CultureRegion })}
                error={!entry.region}
                fullWidth
              >
                {CULTURE_REGIONS.map((region) => (
                  <MenuItem key={region} value={region}>
                    {cultureRegionLabel(region, t)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </>
        )}
        <Grid size={12}>
          <TechnicalInfo>
            <pre>{JSON.stringify(normalizeCultureSkillRank(entry), null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </RmuDialog>
  );
};

export default AddCultureSkillRankDialog;
