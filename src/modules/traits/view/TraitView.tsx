import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { GenericAvatar } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { fetchTrait } from '../../api/trait';
import { Trait } from '../../api/trait.dto';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import { getTraitImage } from '../../services/trait-image-service';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
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
        <Grid size={gridSizeResume}>
          <GenericAvatar imageUrl={getTraitImage(trait)} />
        </Grid>
        <Grid size={gridSizeMain}>
          <TraitViewInfo trait={trait} />
          <TechnicalInfo>
            <pre>{JSON.stringify(trait, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default TraitView;
