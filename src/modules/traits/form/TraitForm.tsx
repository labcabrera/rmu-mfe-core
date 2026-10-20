import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { FormControl, FormControlLabel, Grid, MenuItem, Switch, TextField } from '@mui/material';
import {
  fetchEnumerationCategories,
  LoadingState,
  NumericInput,
  Trait,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { RmuSelect, SelectOption } from '../../shared/selects/RmuSelect';
import SelectTraitCategory from '../../shared/selects/SelectTraitCategory';

/**
 * Specialization kinds that rmu-api-strategic resolves itself (stats, realms, skills of the catalog and weapon types).
 * The enumeration categories are offered after them.
 */
const TRAIT_SPECIALIZATIONS = [
  'stat',
  'realm',
  'skill',
  'combat-skill',
  'melee-combat-skill',
  'ranged-combat-skill',
  'melee-weapon-type',
  'ranged-weapon-type',
];

const TraitForm: FC<{
  formData: Trait;
  setFormData: (data: Trait) => void;
}> = ({ formData, setFormData }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [enumerationCategories, setEnumerationCategories] = useState<SelectOption[]>();

  const bindEnumerationCategories = () => {
    fetchEnumerationCategories(auth)
      .then((response) => {
        const values = [...TRAIT_SPECIALIZATIONS, ...response.filter((e) => !TRAIT_SPECIALIZATIONS.includes(e))];
        setEnumerationCategories(values.map((e) => ({ value: e, description: t(e) })));
      })
      .catch((err) => notify.error(err));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onChangeTierBased = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      isTierBased: checked,
      ...(checked ? { tierCost: null, maxTier: null } : { tierCost: undefined, maxTier: undefined }),
    } as Trait);
  };

  useEffect(() => {
    bindEnumerationCategories();
  }, []);

  if (!formData || !setFormData || !enumerationCategories) return <LoadingState />;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <TextField
          label={t('name')}
          name="name"
          value={formData.name || ''}
          fullWidth
          onChange={onChange}
          error={!formData.name}
        />
      </Grid>
      <Grid size={12}>
        <SelectTraitCategory
          label={t('category')}
          name="category"
          value={formData.category || ''}
          onChange={(e) => setFormData({ ...formData, category: e })}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          select
          label={t('type')}
          name="isTalent"
          value={String(formData.isTalent)}
          onChange={(e) => setFormData({ ...formData, isTalent: e.target.value === 'true' })}
          fullWidth
        >
          <MenuItem value="true">{t('trait')}</MenuItem>
          <MenuItem value="false">{t('flaw')}</MenuItem>
        </TextField>
      </Grid>

      <Grid size={12}>
        <RmuSelect
          label={t('specialization')}
          value={formData.specialization}
          options={enumerationCategories}
          onChange={(e) => setFormData({ ...formData, specialization: e !== '' ? e : null })}
        />
      </Grid>
      <Grid size={12}>
        <FormControl>
          <FormControlLabel
            control={
              <Switch
                value={formData.isTierBased}
                defaultChecked={formData.isTierBased}
                onChange={(e) => onChangeTierBased(e)}
              />
            }
            label={t('is-tier-based')}
            labelPlacement="start"
          />
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <NumericInput
          label={t('adquisition-cost')}
          name="adquisitionCost"
          value={formData.adquisitionCost || null}
          onChange={(e) => setFormData({ ...formData, adquisitionCost: e as number })}
          integer
        />
      </Grid>

      {formData.isTierBased && (
        <>
          <Grid size={{ xs: 12, md: 4 }}>
            <NumericInput
              label={t('tier-cost')}
              name="tierCost"
              value={formData.tierCost}
              onChange={(e) => setFormData({ ...formData, tierCost: e as number })}
              integer
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <NumericInput
              label={t('max-tier')}
              name="maxTier"
              value={formData.maxTier}
              onChange={(e) => setFormData({ ...formData, maxTier: e as number })}
              min={1}
              integer
            />
          </Grid>
        </>
      )}

      <Grid size={12}>
        <TextField
          label={t('description')}
          name="description"
          value={formData.description || ''}
          onChange={onChange}
          multiline
          minRows={4}
          maxRows={10}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default TraitForm;
