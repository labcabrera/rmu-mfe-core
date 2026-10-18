import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Grid, Typography } from '@mui/material';
import { AbsoluteManeuverTable, LoadingState } from '@labcabrera-rmu/rmu-react-shared-lib';

const AbsoluteManeuverTableView: FC<{ table: AbsoluteManeuverTable; result: string | undefined }> = ({
  table,
  result,
}) => {
  const { t } = useTranslation();
  if (!table) return <LoadingState />;

  const getRangeText = (min: number | null, max: number | null) => {
    if (!min) return `< ${max}`;
    if (!max) return `> ${min}`;
    return `${min} - ${max}`;
  };

  const getResultColor = (result: string) => {
    if (result === 'success' || result === 'absolute-success') return 'success';
    if (result === 'partial-success') return 'warning';
    return 'error';
  };

  const getEntryColor = (entryResult: string) =>
    !result || entryResult !== result ? 'primary' : getResultColor(result);

  return (
    <>
      <Grid container spacing={1}>
        {table.table.map((entry, index) => {
          const color = getEntryColor(entry.result.result);
          return (
            <Grid key={index} size={12}>
              <Grid container spacing={1}>
                <Grid size={2}>
                  <Typography variant="body1" color={color}>
                    {getRangeText(entry.min, entry.max)}
                  </Typography>
                </Grid>
                <Grid size={3}>
                  <Typography variant="body1" color={color}>
                    {t(entry.result.result)}
                  </Typography>
                </Grid>
                <Grid size={7}>
                  <Typography variant="body2" color={color}>
                    {entry.result.message}
                  </Typography>
                </Grid>
              </Grid>
              {index < table.table.length - 1 && <Divider />}
            </Grid>
          );
        })}
      </Grid>
      <Grid container spacing={1}>
        <Typography variant="body2">{table.unusualEvent}</Typography>
      </Grid>
    </>
  );
};

export default AbsoluteManeuverTableView;
