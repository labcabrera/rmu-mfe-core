import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Chip, Grid, Paper, Stack, Typography } from '@mui/material';
import { ResistanceRollResult } from '@labcabrera-rmu/rmu-react-shared-lib';

const ResistanceRollViewResult: FC<{
  result: ResistanceRollResult | undefined;
}> = ({ result }) => {
  const { t } = useTranslation();
  if (!result) return;

  return (
    <>
      <Paper sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <Typography variant="h6" gutterBottom color={result.failure > 0 ? 'error' : 'success'}>
              {t(result.result)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t('Total roll')}: {result.totalRoll}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t('Failure')}: {result.failure}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
              {result.modifiers.map((e, index) => (
                <Chip key={index} label={`${t(e.key)}: ${e.value}`} color={e.value < 0 ? 'error' : 'success'} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default ResistanceRollViewResult;
