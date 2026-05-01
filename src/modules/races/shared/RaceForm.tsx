import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { CategorySeparator, Race } from '@labcabrera-rmu/rmu-react-shared-lib';
import RaceFormAttributes from './RaceFormAttributes';
import RaceFormLore from './RaceFormLore';
import RaceFormResistances from './RaceFormResistances';
import RaceFormStats from './RaceFormStats';

const RaceForm: FC<{
  realmId: string;
  formData: Race;
  setFormData: Dispatch<SetStateAction<Race>>;
}> = ({ realmId, formData, setFormData }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 12 }}>
        <RaceFormAttributes formData={formData} setFormData={setFormData} />
        <CategorySeparator text={t('statistics')} />
        <RaceFormStats formData={formData} setFormData={setFormData} />
        <CategorySeparator text={t('resistances')} />
        <RaceFormResistances formData={formData} setFormData={setFormData} />
        <CategorySeparator text={t('lore')} />
        <RaceFormLore realmId={realmId} formData={formData} setFormData={setFormData} />
      </Grid>
    </Grid>
  );
};

export default RaceForm;
