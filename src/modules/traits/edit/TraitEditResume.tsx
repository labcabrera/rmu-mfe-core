import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, MenuItem, Select, TextField } from '@mui/material';
import { UpdateTraitDto } from '../../api/trait.dto';
import SelectTraitCategory from '../../shared/selects/SelectTraitCategory';

const TraitEditResume: FC<{
  formData: UpdateTraitDto;
  setFormData: Dispatch<SetStateAction<UpdateTraitDto>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (!formData || !setFormData) return <p>Loading...</p>;

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextField label={t('name')} name="name" value={formData.name} onChange={onChange} fullWidth />
      </Grid>
      <Grid size={12}>
        <SelectTraitCategory label={t('category')} name="category" value={formData.category} onChange={onChange} />
      </Grid>
      <Grid size={12}>
        <Select
          label={t('type')}
          name="isTalent"
          value={String(formData.isTalent)}
          onChange={(e) => setFormData({ ...formData, isTalent: e.target.value === 'true' })}
          fullWidth
        >
          <MenuItem value="true">{t('trait')}</MenuItem>
          <MenuItem value="false">{t('flaw')}</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
};

export default TraitEditResume;
