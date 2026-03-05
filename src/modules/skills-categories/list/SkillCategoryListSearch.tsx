import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import ClearableTextField from '../../shared/inputs/ClearableTextField';

const SkillCategoryListSearch: FC<{
  setQueryString: Dispatch<SetStateAction<string>>;
}> = ({ setQueryString }) => {
  const [id, setId] = useState('');

  useEffect(() => {
    let query = '';
    if (id) query += `id=re=${id}`;
    setQueryString(query);
  }, [id]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <ClearableTextField label={t('name')} value={id} onChange={(e) => setId(e.target.value)} name="name" />
      </Grid>
    </Grid>
  );
};

export default SkillCategoryListSearch;
