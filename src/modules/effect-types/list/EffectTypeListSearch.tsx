import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, MenuItem, TextField } from '@mui/material';
import {
  ClearableTextField,
  effectPropertyRequirements,
  EffectPropertyRequirement,
} from '@labcabrera-rmu/rmu-react-shared-lib';

const EffectTypeListSearch: FC<{
  setSearchString: Dispatch<SetStateAction<string>>;
}> = ({ setSearchString }) => {
  const { t } = useTranslation();
  const [id, setId] = useState('');
  const [isPersistent, setIsPersistent] = useState('all');
  const [valueRequirement, setValueRequirement] = useState('all');

  const buildSearchString = (id: string, persistent: string, value: string) => {
    let query = '';
    if (id) query += `id=re=${id}`;
    if (persistent && persistent !== 'all') {
      if (query !== '') query += ';';
      query += `isPersistent==${persistent}`;
    }
    if (value && value !== 'all') {
      if (query !== '') query += ';';
      query += `value==${value}`;
    }
    return query;
  };

  useEffect(() => {
    setSearchString(buildSearchString(id, isPersistent, valueRequirement));
  }, [id, isPersistent, valueRequirement]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <ClearableTextField label={t('id')} name="id" value={id} onChange={(e) => setId(e.target.value)} />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          select
          label={t('is-persistent')}
          value={isPersistent}
          onChange={(e) => setIsPersistent(e.target.value)}
          fullWidth
        >
          <MenuItem value="all">{t('all')}</MenuItem>
          <MenuItem value="true">{t('yes')}</MenuItem>
          <MenuItem value="false">{t('no')}</MenuItem>
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          select
          label={t('value')}
          value={valueRequirement}
          onChange={(e) => setValueRequirement(e.target.value as EffectPropertyRequirement)}
          fullWidth
        >
          <MenuItem value="all">{t('all')}</MenuItem>
          {effectPropertyRequirements.map((requirement) => (
            <MenuItem key={requirement} value={requirement}>
              {t(requirement)}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default EffectTypeListSearch;
