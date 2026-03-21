import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useError } from '../../ErrorContext';
import { resistanceRoll } from '../api/resistance-roll';
import { ResistanceRollQuery, ResistanceRollResult } from '../api/resistance-roll.dto';
import { gridSizeResume, gridSizeMain } from '../services/display';
import { openEndedRoll } from '../services/random-service';
import ResistanceRollViewForm from './ResistanceRollViewForm';
import ResistanceRollViewResult from './ResistanceRollViewResult';

const ResistanceRollView: FC = () => {
  const { showError } = useError();
  const [formData, setFormData] = useState<ResistanceRollQuery>({
    attackLevel: null,
    targetLevel: null,
    roll: null,
    modifiers: [{ key: 'other', value: 0 }],
  } as ResistanceRollQuery);
  const [result, setResult] = useState<ResistanceRollResult>();

  const onRandom = () => {
    setFormData({ ...formData, roll: openEndedRoll() });
  };

  const onSubmit = () => {
    resistanceRoll(formData)
      .then((result) => setResult(result))
      .catch((err) => showError(err.message));
  };

  const isValidForm = (): boolean => {
    if (!formData || !formData.attackLevel || !formData.targetLevel || !formData.roll) return false;
    return true;
  };

  useEffect(() => {
    const isValid = isValidForm();
    if (isValid) {
      onSubmit();
    }
  }, [formData]);

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ResistanceRollViewForm formData={formData} setFormData={setFormData} onRandom={onRandom} />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <ResistanceRollViewResult result={result} />
            </Grid>
          </Grid>
        </Grid>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </Grid>
    </>
  );
};

export default ResistanceRollView;
