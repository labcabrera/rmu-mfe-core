import React, { FC } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { t } from 'i18next';
import { AbsoluteManeuverTable } from '../api/maneuver.dto';

const AbsoluteManeuverTableView: FC<{ table: AbsoluteManeuverTable; result: string | undefined }> = ({
  table,
  result,
}) => {
  if (!table) return <p>Loading...</p>;

  const getRangeText = (min: number | null, max: number | null) => {
    if (!min) return `<${max}`;
    if (!max) return `>${min}`;
    return `${min} - ${max}`;
  };

  return (
    <>
      <Paper sx={{ padding: 1 }}>
        <Grid container spacing={1}>
          {table.table.map((entry, index) => {
            const color = !result || entry.result.result !== result ? 'primary' : 'success';
            return (
              <Grid key={index} size={12}>
                <Grid container spacing={1}>
                  <Grid size={2}>
                    <Typography variant="body2" color={color}>
                      {getRangeText(entry.min, entry.max)}
                    </Typography>
                  </Grid>
                  <Grid size={3}>
                    <Typography variant="body2" color={color}>
                      {t(entry.result.result)}
                    </Typography>
                  </Grid>
                  <Grid size={7}>
                    <Typography variant="body2" color={color}>
                      {entry.result.message}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
      <Paper sx={{ padding: 1, mt: 2 }}>
        <Grid container spacing={1}>
          <Typography variant="body2">{table.unusualEvent}</Typography>
        </Grid>
      </Paper>
    </>
  );
};

export default AbsoluteManeuverTableView;
