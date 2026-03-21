import React, { FC } from 'react';
import { Chip, Grid, Paper, Stack, Typography } from '@mui/material';
import { t } from 'i18next';
import { ResistanceRollResult } from '../api/resistance-roll.dto';

const ResistanceRollViewResult: FC<{
  result: ResistanceRollResult | undefined;
}> = ({ result }) => {
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
