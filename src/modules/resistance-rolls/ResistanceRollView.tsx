import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useError } from '../../ErrorContext';
import { resistanceRoll } from '../api/resistance-roll';
import { ResistanceRollQuery, ResistanceRollResult } from '../api/resistance-roll.dto';
import { gridSizeResume, gridSizeMain } from '../services/display';
import ResistanceRollViewForm from './ResistanceRollViewForm';
import ResistanceRollViewResult from './ResistanceRollViewResult';

const ResistanceRollView: FC = () => {
  const { showError } = useError();
  const [formData, setFormData] = useState<ResistanceRollQuery>({
    attackLevel: null,
    targetLevel: null,
    roll: null,
    modifiers: [],
  } as ResistanceRollQuery);
  const [result, setResult] = useState<ResistanceRollResult>();
  const [isValid, setIsValid] = useState<boolean>(false);

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
    setIsValid(isValidForm());
  }, [formData]);

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <Grid container spacing={1}>
            <Grid size={4}>
              <ResistanceRollViewForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                isValid={isValid}
              />
            </Grid>
            <Grid size={8}>
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
