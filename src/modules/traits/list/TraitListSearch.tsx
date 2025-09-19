import React, { FC, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { t } from 'i18next';
import SelectTraitCategory from '../../shared/selects/SelectTraitCategory';

const TraitListSearch: FC<{
  onSearch: (id: string, category: string) => void;
}> = ({ onSearch }) => {
  const [id, setId] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    onSearch(id, category);
  };

  return (
    <Box display="flex" gap={2} alignItems="center" mb={2}>
      <TextField label={t('trait')} value={id} onChange={(e) => setId(e.target.value)} variant="standard" />
      <SelectTraitCategory
        value={category}
        onChange={(e: React.ChangeEvent<{ value: unknown }>) => setCategory(e.target.value as string)}
        displayAll={true}
        label={t('category')}
        name={'category'}
      />
      <Button variant="contained" onClick={handleSearch}>
        {t('search')}
      </Button>
    </Box>
  );
};

export default TraitListSearch;
