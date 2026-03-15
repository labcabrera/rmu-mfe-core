import React, { Dispatch, FC, SetStateAction } from 'react';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { CreateRaceDto, UpdateRaceDto } from '../../api/race.dto';
import CharacterSeparator from '../../shared/display/CategorySeparator';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
import RaceFormAttributes from './RaceFormAttributes';
import RaceFormLore from './RaceFormLore';
import RaceFormResistances from './RaceFormResistances';
import RaceFormStats from './RaceFormStats';

const RaceForm: FC<{
  formData: CreateRaceDto | UpdateRaceDto;
  setFormData: Dispatch<SetStateAction<CreateRaceDto | UpdateRaceDto | undefined>>;
}> = ({ formData, setFormData }) => {
  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 8 }}>
        <RaceFormAttributes formData={formData} setFormData={setFormData} />
        <CharacterSeparator text={t('statistics')} />
        <RaceFormStats formData={formData} setFormData={setFormData} />
        <CharacterSeparator text={t('resistances')} />
        <RaceFormResistances formData={formData} setFormData={setFormData} />
        <CharacterSeparator text={t('lore')} />
        <RaceFormLore formData={formData} setFormData={setFormData} />
        <TechnicalInfo>
          <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
        </TechnicalInfo>
      </Grid>
    </Grid>
  );
};

export default RaceForm;
