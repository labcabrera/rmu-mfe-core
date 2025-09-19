import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { fetchTrait } from '../../api/trait';
import { Trait } from '../../api/trait.dto';
import RealmEditActions from './TraitEditActions';
import TraitEditAttributes from './TraitEditAttributes';

const TraitEdit: FC = () => {
  const location = useLocation();
  const { traitId } = useParams<{ traitId: string }>();
  const trait = (location.state as { trait?: Trait })?.trait;
  const [formData, setFormData] = useState<Trait | null>(null);

  useEffect(() => {
    if (!trait && traitId) {
      fetchTrait(traitId).then((data) => {
        setFormData(data);
      });
    }
  }, [trait, traitId]);

  useEffect(() => {
    if (trait) {
      setFormData(trait);
    }
  }, [trait]);

  if (!trait) return <div>Loading...</div>;

  return (
    <>
      <RealmEditActions traitId={traitId} formData={formData} />
      <Grid container spacing={1}>
        <Grid size={4}>
          <TraitEditAttributes traitId={traitId} formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
    </>
  );
};

export default TraitEdit;
