import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid } from '@mui/material';
import { CategorySeparator } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { CreateRaceDto, UpdateRaceDto } from '../../api/race.dto';
import RaceFormAttributes from './RaceFormAttributes';
import RaceFormLore from './RaceFormLore';
import RaceFormResistances from './RaceFormResistances';
import RaceFormStats from './RaceFormStats';

const RaceForm: FC<{
  realmId: string;
  formData: CreateRaceDto | UpdateRaceDto;
  setFormData: Dispatch<SetStateAction<CreateRaceDto | UpdateRaceDto | undefined>>;
}> = ({ realmId, formData, setFormData }) => {
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
