import React, { FC } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { CategorySeparator, RmuCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { Enumeration } from '../../api/enumerations.dto';
import { imageBaseUrl } from '../../services/config';

const SkillViewSpecializations: FC<{
  enumerations: Enumeration[];
}> = ({ enumerations }) => {
  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12 }}>
        <CategorySeparator text={t('Available specializations')} />
        <Grid container spacing={1}>
          {enumerations.map((e) => (
            <Grid key={e.id} size={{ xs: 12, md: 3 }}>
              <RmuCard image={`${imageBaseUrl}images/generic/configuration.png`}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="column">
                    <Typography>{e.key}</Typography>
                  </Stack>
                </Stack>
              </RmuCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SkillViewSpecializations;
