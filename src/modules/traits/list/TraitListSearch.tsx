import React, { FC, useEffect, useState } from 'react';
import { TextField, Grid } from '@mui/material';
import { t } from 'i18next';
import ClearButton from '../../shared/buttons/ClearButton';
import SelectTraitCategory from '../../shared/selects/SelectTraitCategory';
import SelectTraitType from '../../shared/selects/SelectTraitType';

const TraitListSearch: FC<{
  onSearch: (id: string, category: string, type: string) => void;
}> = ({ onSearch }) => {
  const [id, setId] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');

  const handleSearch = () => {
    onSearch(id, category, type);
  };

  const handleClear = () => {
    setId('');
    setCategory('');
    setType('');
    onSearch('', '', '');
  };

  useEffect(() => {
    handleSearch();
  }, [id, category, type]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 10, md: 3 }}>
        <TextField label={t('name')} value={id} onChange={(e) => setId(e.target.value)} fullWidth />
      </Grid>
      <Grid size={{ xs: 10, md: 3 }}>
        <SelectTraitCategory
          value={category}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => setCategory(e.target.value as string)}
          addAllOption={true}
          label={t('category')}
          name={'category'}
        />
      </Grid>
      <Grid size={{ xs: 10, md: 3 }}>
        <SelectTraitType
          value={type}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => setType(e.target.value as string)}
          addAllOption={true}
          label={t('trait-type')}
          name={'trait-type'}
        />
      </Grid>
      <Grid size={{ xs: 2, md: 3 }}>
        <ClearButton onClick={handleClear} />
      </Grid>
    </Grid>
  );
};

export default TraitListSearch;
