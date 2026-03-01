import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchTrait } from '../../api/trait';
import { Trait } from '../../api/trait.dto';
import { getTraitImage } from '../../services/trait-image-service';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import TraitViewActions from './TraitViewActions';
import TraitViewInfo from './TraitViewInfo';
import TraitViewResume from './TraitViewResume';

const TraitView: FC = () => {
  const location = useLocation();
  const { traitId } = useParams<{ traitId?: string }>();
  const { showError } = useError();
  const [trait, setTrait] = useState<Trait | null>(null);

  useEffect(() => {
    if (location.state && location.state.trait) {
      setTrait(location.state.trait);
    } else if (traitId) {
      fetchTrait(traitId)
        .then((response) => {
          setTrait(response);
        })
        .catch((err: unknown) => {
          if (err instanceof Error) showError(err.message);
          else showError(String(err));
        });
    }
  }, [location.state, traitId, showError]);

  if (!trait) return <p>Loading...</p>;

  return (
    <>
      <TraitViewActions trait={trait} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <GenericAvatar imageUrl={getTraitImage(trait)} size={300} />
          <TraitViewResume trait={trait} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <TraitViewInfo trait={trait} />
        </Grid>
      </Grid>
    </>
  );
};

export default TraitView;
