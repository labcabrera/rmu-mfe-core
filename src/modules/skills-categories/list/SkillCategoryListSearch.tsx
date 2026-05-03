import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { ClearableTextField } from '@labcabrera-rmu/rmu-react-shared-lib';

const SkillCategoryListSearch: FC<{
  setQueryString: Dispatch<SetStateAction<string>>;
}> = ({ setQueryString }) => {
  const { t } = useTranslation();
  const [id, setId] = useState('');

  useEffect(() => {
    let query = '';
    if (id) query += `id=re=${id}`;
    setQueryString(query);
  }, [id]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <ClearableTextField label={t('name')} value={id} onChange={(e) => setId(e || '')} name="name" />
      </Grid>
    </Grid>
  );
};

export default SkillCategoryListSearch;
