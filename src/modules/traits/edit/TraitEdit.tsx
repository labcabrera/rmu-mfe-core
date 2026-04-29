import React, { FC, useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { fetchTrait, GenericAvatar, TechnicalInfo, Trait } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { gridSizeResume, gridSizeMain } from '../../services/display';
import { getTraitImage } from '../../services/trait-image-service';
import TraitForm from '../shared/TraitForm';
import RealmEditActions from './TraitEditActions';

const TraitEdit: FC = () => {
  const location = useLocation();
  const auth = useAuth();
  const { showError } = useError();
  const { traitId } = useParams<{ traitId: string }>();
  const [trait, setTrait] = useState<Trait | null>(null);
  const [formData, setFormData] = useState<Trait>({} as unknown as Trait);

  useEffect(() => {
    if (trait) {
      setFormData(trait);
    }
  }, [trait]);

  useEffect(() => {
    if (location.state && location.state.trait) {
      setTrait(location.state.trait);
    } else if (traitId) {
      fetchTrait(traitId, auth)
        .then((data) => setTrait(data))
        .catch((err: Error) => showError(err.message));
    }
  }, [location.state, traitId, showError]);

  if (!trait || !formData) return <div>Loading trait...</div>;

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={gridSizeResume}>
          <GenericAvatar imageUrl={getTraitImage(trait)} />
        </Grid>
        <Grid size={gridSizeMain}>
          <RealmEditActions trait={trait} formData={formData} />
          <TraitForm formData={formData} setFormData={setFormData} />
          <TechnicalInfo>
            <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default TraitEdit;
