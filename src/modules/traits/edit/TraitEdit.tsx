import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Trait } from '../../api/trait.dto';
import RealmEditActions from './TraitEditActions';
import TraitEditAttributes from './TraitEditAttributes';

const TraitEdit: FC = () => {
  const location = useLocation();
  const trait = (location.state as { trait?: Trait })?.trait;

  const [formData, setFormData] = useState<Trait | null>(null);

  if (!trait) return <div>Loading...</div>;

  return (
    <>
      <RealmEditActions trait={trait} formData={formData} />
      <Grid container spacing={1}>
        <Grid size={4}>
          <TraitEditAttributes formData={formData} setFormData={setFormData} />
        </Grid>
      </Grid>
    </>
  );
};

export default TraitEdit;
