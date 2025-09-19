import React, { FC, useEffect, useState } from 'react';
import { TextField, Box } from '@mui/material';
import { t } from 'i18next';
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

  useEffect(() => {
    handleSearch();
  }, [id, category, type]);

  return (
    <Box display="flex" gap={2} alignItems="center" mb={2}>
      <TextField label={t('trait')} value={id} onChange={(e) => setId(e.target.value)} variant="standard" fullWidth />
      <SelectTraitCategory
        value={category}
        onChange={(e: React.ChangeEvent<{ value: unknown }>) => setCategory(e.target.value as string)}
        displayAll={true}
        label={t('category')}
        name={'category'}
      />
      <SelectTraitType
        value={type}
        onChange={(e: React.ChangeEvent<{ value: unknown }>) => setType(e.target.value as string)}
        label={t('trait-type')}
        name={'trait-type'}
      />
    </Box>
  );
};

export default TraitListSearch;
