import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, MenuItem, Select, TextField } from '@mui/material';
import { CreateTraitDto } from '../../api/trait.dto';
import SelectTraitCategory from '../../shared/selects/SelectTraitCategory';

const TraitCreationResume: FC<{
  formData: CreateTraitDto;
  setFormData: Dispatch<SetStateAction<CreateTraitDto>>;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (!formData || !setFormData) return <p>Loading...</p>;

  return (
    <Grid container spacing={2} mt={3}>
      <Grid size={12}>
        <TextField
          label={t('name')}
          name="name"
          value={formData.name || ''}
          variant="standard"
          fullWidth
          onChange={onChange}
        />
      </Grid>
      <Grid size={12}>
        <SelectTraitCategory label={t('category')} name="category" value={formData.category} onChange={onChange} />
      </Grid>
      <Grid size={12}>
        <TextField
          select
          label={t('type')}
          name="isTalent"
          value={String(formData.isTalent)}
          onChange={(e) => setFormData({ ...formData, isTalent: e.target.value === 'true' })}
          variant="standard"
          fullWidth
        >
          <MenuItem value="true">{t('trait')}</MenuItem>
          <MenuItem value="false">{t('flaw')}</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default TraitCreationResume;
