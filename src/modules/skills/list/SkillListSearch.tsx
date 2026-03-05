import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField, Grid, IconButton, InputAdornment } from '@mui/material';
import { t } from 'i18next';
import { SkillCategory } from '../../api/skill-category.dto';
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

  const handleClearName = () => {
    setSearchId('');
  };

  useEffect(() => {
    setQueryString(buildQueryString());
  }, [searchId, category]);

  if (!categories || categories.length === 0) return <p>Loading</p>;

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          label={t('name')}
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          fullWidth
          slotProps={{
            input: searchId
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" aria-label="clear name" onClick={handleClearName} edge="end">
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : undefined,
          }}
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
