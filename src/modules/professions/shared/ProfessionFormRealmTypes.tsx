import React, { Dispatch, FC, SetStateAction } from 'react';
import { Button, ButtonGroup, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Profession, RealmType } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';

const REALM_TYPES: RealmType[] = ['channeling', 'essence', 'mentalism'];

const ProfessionFormRealmTypes: FC<{
  formData: Profession;
  setFormData: Dispatch<SetStateAction<Profession | undefined>>;
}> = ({ formData, setFormData }) => {
  const selectedAvailable = formData.availableRealmTypes || [];
  const selectedFixed = formData.fixedRealmTypes || [];

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const toggle = (rt: RealmType, type: 'available' | 'fixed') => {
    const selected = type === 'available' ? selectedAvailable : selectedFixed;
    const next = selected.includes(rt) ? selected.filter((s) => s !== rt) : [...selected, rt];
    const attribute = type === 'available' ? 'availableRealmTypes' : 'fixedRealmTypes';
    const otherAttribute = type === 'available' ? 'fixedRealmTypes' : 'availableRealmTypes';
    const update: any = { ...formData, [attribute]: next };
    if (next.length > 0) {
      update[otherAttribute] = [];
    }
    setFormData(update);
  };

  const RealmTypButtonGroup = ({ selected, type }: { selected: RealmType[]; type: 'available' | 'fixed' }) => (
    <ButtonGroup
      variant="outlined"
      aria-label="realm-types"
      orientation={isSmall ? 'vertical' : 'horizontal'}
      sx={{ flexWrap: 'wrap' }}
      size="small"
    >
      {REALM_TYPES.map((rt) => {
        const isSelected = selected.includes(rt);
        return (
          <Button
            key={rt}
            onClick={() => toggle(rt, type)}
            variant={isSelected ? 'contained' : 'outlined'}
            color={isSelected ? 'primary' : 'inherit'}
          >
            {t(rt)}
          </Button>
        );
      })}
    </ButtonGroup>
  );

  return (
    <Grid container spacing={1}>
      <Grid size={6}>Available</Grid>
      <Grid size={6}>
        <RealmTypButtonGroup selected={selectedAvailable} type="available" />
      </Grid>
      <Grid size={6}>Fixed</Grid>
      <Grid size={6}>
        <RealmTypButtonGroup selected={selectedFixed} type="fixed" />
      </Grid>
    </Grid>
  );
};

export default ProfessionFormRealmTypes;
