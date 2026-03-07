import React, { ChangeEvent, Dispatch, FC, SetStateAction, use, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import ClearableTextField from '../../shared/inputs/ClearableTextField';
import SelectTraitCategory from '../../shared/selects/SelectTraitCategory';
import SelectTraitType from '../../shared/selects/SelectTraitType';

const TraitListSearch: FC<{
  setSearchString: Dispatch<SetStateAction<string>>;
}> = ({ setSearchString }) => {
  const [searchId, setId] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');

  const buildSearchString = (id: string, category: string, type: string) => {
    let query = '';
    if (id) query += `id=re=${id}`;
    if (category && category !== 'all') {
      if (query !== '') query += ';';
      query += `category==${category}`;
    }
    if (type && type !== 'all') {
      if (query !== '') query += ';';
      query += `isTalent==${type === 'talent'}`;
    }
    return query;
  };

  useEffect(() => {
    setSearchString(buildSearchString(searchId, category, type));
  }, [searchId, category, type]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <ClearableTextField label="Name" name="name" value={searchId} onChange={(e) => setId(e.target.value)} />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectTraitCategory
          value={category}
          onChange={(e: ChangeEvent<{ value: unknown }>) => setCategory(e.target.value as string)}
          addAllOption={true}
          label={t('category')}
          name={'category'}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectTraitType
          value={type}
          onChange={(e: ChangeEvent<{ value: unknown }>) => setType(e.target.value as string)}
          addAllOption={true}
          label={t('trait-type')}
          name={'trait-type'}
        />
      </Grid>
    </Grid>
  );
};

export default TraitListSearch;
