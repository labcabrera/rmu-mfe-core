import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchTrait } from '../../api/trait';
import { Trait } from '../../api/trait.dto';
import { getTraitImage } from '../../services/trait-image-service';
import GenericAvatar from '../../shared/avatars/GenericAvatar';
import RealmEditActions from './TraitEditActions';
import TraitEditAttributes from './TraitEditAttributes';
import TraitEditResume from './TraitEditResume';

const TraitEdit: FC = () => {
  const location = useLocation();
  const { showError } = useError();
  const { traitId } = useParams<{ traitId: string }>();
  const [trait, setTrait] = useState<Trait | null>(null);
  const [formData, setFormData] = useState<Trait | null>(null);

  useEffect(() => {
    if (trait) {
      setFormData(trait);
    }
  }, [trait]);

  useEffect(() => {
    if (location.state && location.state.trait) {
      setTrait(location.state.trait);
    } else if (traitId) {
      fetchTrait(traitId)
        .then((data) => setTrait(data))
        .catch((err: Error) => showError(err.message));
    }
  }, [location.state, traitId, showError]);

  if (!trait || !formData) return <div>Loading trait...</div>;

  return (
    <>
      <RealmEditActions traitId={traitId} formData={formData} />
      <Grid container spacing={2}>
        <Grid size={2}>
          <GenericAvatar imageUrl={getTraitImage(trait)} size={300} />
          <TraitEditResume formData={formData} setFormData={setFormData} />
        </Grid>
        <Grid size={8}>
          <TraitEditAttributes formData={formData} setFormData={setFormData} />
        </Grid>
        {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      </Grid>
    </>
  );
};

export default TraitEdit;
