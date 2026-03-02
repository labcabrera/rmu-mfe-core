import React, { FC, useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField, Box, IconButton } from '@mui/material';
import { t } from 'i18next';
import { SkillCategory } from '../../api/skill-category.dto';
import SelectSkillCategory from '../../shared/selects/SelectSkillCategory';

const SkillListSearch: FC<{
  categories: SkillCategory[];
  onSearch: (id: string, category: string) => void;
}> = ({ categories, onSearch }) => {
  const [id, setId] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    onSearch(id, category);
  };

  useEffect(() => {
    handleSearch();
  }, [id, category]);

  return (
    <Box display="flex" gap={2} alignItems="center" mb={2}>
      <TextField label={t('name')} value={id} onChange={(e) => setId(e.target.value)} fullWidth />
      <SelectSkillCategory
        value={category}
        onChange={(e: React.ChangeEvent<{ value: unknown }>) => setCategory(e.target.value as string)}
        label={t('category')}
        categories={categories}
      />
      <IconButton
        onClick={() => {
          setId('');
          setCategory('');
        }}
        title={t('clear')}
      >
        <ClearIcon />
      </IconButton>
    </Box>
  );
};

export default SkillListSearch;
