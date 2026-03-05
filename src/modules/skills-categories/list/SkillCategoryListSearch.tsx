import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import { t } from 'i18next';

const SkillCategoryListSearch: FC<{
  setQueryString: Dispatch<SetStateAction<string>>;
}> = ({ setQueryString }) => {
  const [id, setId] = useState('');

  const onSearchIdClear = () => {
    setId('');
  };

  useEffect(() => {
    let query = '';
    if (id) query += `id=re=${id}`;
    setQueryString(query);
  }, [id]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          label={t('name')}
          value={id}
          onChange={(e) => setId(e.target.value)}
          fullWidth
          slotProps={{
            input: id
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" aria-label="clear name" onClick={onSearchIdClear} edge="end">
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : undefined,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SkillCategoryListSearch;
