import React, { Dispatch, FC, SetStateAction } from 'react';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { t } from 'i18next';
import { CreateProfessionDto, RealmType, UpdateProfessionDto } from '../../api/profession.dto';

const REALM_TYPES: RealmType[] = ['channeling', 'essence', 'mentalism'];

const ProfessionCreationRealmTypes: FC<{
  formData: CreateProfessionDto | UpdateProfessionDto;
  setFormData: Dispatch<SetStateAction<CreateProfessionDto | UpdateProfessionDto | undefined>>;
}> = ({ formData, setFormData }) => {
  const selected = formData.availableRealmTypes || [];

  const toggle = (rt: RealmType) => {
    const next = selected.includes(rt) ? selected.filter((s) => s !== rt) : [...selected, rt];
    setFormData({ ...formData, availableRealmTypes: next });
  };

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <ButtonGroup variant="outlined" aria-label="realm-types" sx={{ flexWrap: 'wrap' }}>
          {REALM_TYPES.map((rt) => {
            const isSelected = selected.includes(rt);
            return (
              <Button
                key={rt}
                onClick={() => toggle(rt)}
                variant={isSelected ? 'contained' : 'outlined'}
                color={isSelected ? 'primary' : 'inherit'}
              >
                {t(rt)}
              </Button>
            );
          })}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default ProfessionCreationRealmTypes;
