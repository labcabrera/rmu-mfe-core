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

const TraitView: FC = () => {
  const location = useLocation();
  const { traitId } = useParams<{ traitId?: string }>();
  const { showError } = useError();
  const [trait, setTrait] = useState<Trait | null>(null);

  const bindTrait = () => {
    if (traitId) {
      fetchTrait(traitId)
        .then((response) => setTrait(response))
        .catch((err: Error) => showError(err.message));
    }
  };

  useEffect(() => {
    if (location.state && location.state.trait) {
      setTrait(location.state.trait);
    } else if (traitId) {
      bindTrait();
    }
  }, [location.state, traitId, showError]);

  if (!trait) return <p>Loading...</p>;

  return (
    <>
      <TraitViewActions trait={trait} onRefresh={bindTrait} />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}>
          <GenericAvatar imageUrl={getTraitImage(trait)} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TraitViewInfo trait={trait} />
        </Grid>
      </Grid>
    </>
  );
};

export default TraitView;
