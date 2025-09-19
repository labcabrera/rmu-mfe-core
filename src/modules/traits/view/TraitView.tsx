import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchTrait } from '../../api/trait';
import { Trait } from '../../api/trait.dto';
import TraitViewActions from './TraitViewActions';
import TraitViewInfo from './TraitViewInfo';

const TraitView: FC = () => {
  const location = useLocation();
  const { traitId } = useParams<{ traitId?: string }>();
  const { showError } = useError();
  const [trait, setTrait] = useState<Trait | null>(null);

  const bindTrait = async (traitId?: string) => {
    if (!traitId) return;
    fetchTrait(traitId)
      .then((response) => {
        setTrait(response);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError(String(err));
      });
  };

  useEffect(() => {
    if (location.state && location.state.trait) {
      setTrait(location.state.trait);
    } else {
      bindTrait(traitId);
    }
  }, [location.state, traitId]);

  if (!trait) return <p>Loading...</p>;

  return (
    <>
      <TraitViewActions trait={trait} />
      <Grid container spacing={1}>
        <Grid size={6}>
          <TraitViewInfo trait={trait} />
        </Grid>
        <Grid size={12}></Grid>
      </Grid>
    </>
  );
};

export default TraitView;
