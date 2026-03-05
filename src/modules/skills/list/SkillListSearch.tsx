import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { TextField, Grid } from '@mui/material';
import { t } from 'i18next';
import { SkillCategory } from '../../api/skill-category.dto';
import ClearButton from '../../shared/buttons/ClearButton';
import SelectSkillCategory from '../../shared/selects/SelectSkillCategory';

const SkillListSearch: FC<{
  queryString: string;
  setQueryString: Dispatch<SetStateAction<string>>;
  categories: SkillCategory[];
}> = ({ queryString, setQueryString, categories }) => {
  const [searchId, setSearchId] = useState('');
  const [category, setCategory] = useState('');

  const buildQueryString = () => {
    let query = '';
    if (searchId) query += `id=re=${searchId}`;
    if (category && category !== 'all') {
      if (query !== '') query += ';';
      query += `categoryId==${category}`;
    }
    return query;
  };

  useEffect(() => {
    setQueryString(buildQueryString());
  }, [searchId, category]);

  if (!categories || categories.length === 0) return <p>Loading</p>;

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 10, md: 3 }}>
        <TextField label={t('name')} value={searchId} onChange={(e) => setSearchId(e.target.value)} fullWidth />
      </Grid>
      <Grid size={{ xs: 10, md: 3 }}>
        <SelectSkillCategory
          value={category}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => setCategory(e.target.value as string)}
          label={t('category')}
          categories={categories}
        />
      </Grid>
      <Grid size={{ xs: 2, md: 2 }}>
        <ClearButton
          onClick={() => {
            setSearchId('');
            setCategory('');
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SkillListSearch;
