import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { SkillCategory } from '../../api/skill-category.dto';
import ClearableTextField from '../../shared/inputs/ClearableTextField';
import SelectSkillCategory from '../../shared/selects/SelectSkillCategory';

const SkillListSearch: FC<{
  setQueryString: Dispatch<SetStateAction<string>>;
  categories: SkillCategory[];
}> = ({ setQueryString, categories }) => {
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
      <Grid size={{ xs: 12, md: 3 }}>
        <ClearableTextField
          name={'name'}
          label={t('name')}
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectSkillCategory
          value={category}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => setCategory(e.target.value as string)}
          label={t('category')}
          categories={categories}
          allowEmpty={true}
        />
      </Grid>
    </Grid>
  );
};

export default SkillListSearch;
