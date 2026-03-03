import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { TextField, Grid } from '@mui/material';
import { t } from 'i18next';
import ClearButton from '../../shared/buttons/ClearButton';

const SkillCategoryListSearch: FC<{
  queryString: string;
  setQueryString: Dispatch<SetStateAction<string>>;
}> = ({ queryString, setQueryString }) => {
  const [id, setId] = useState('');

  const onResetSearch = () => {
    setId('');
  };

  useEffect(() => {
    let query = '';
    if (id) query += `id=re=${id}`;
    setQueryString(query);
  }, [id]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 10, md: 3 }}>
        <TextField label={t('name')} value={id} onChange={(e) => setId(e.target.value)} fullWidth />
      </Grid>
      <Grid size={{ xs: 2, md: 2 }}>
        <ClearButton onClick={onResetSearch} />
      </Grid>
    </Grid>
  );
};

export default SkillCategoryListSearch;
