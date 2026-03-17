import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchEnumerations } from '../../api/enumerations';
import { Enumeration } from '../../api/enumerations.dto';
import AddButton from '../../shared/buttons/AddButton';
import CategorySeparator from '../../shared/display/CategorySeparator';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
import AddEnumerationDialog from '../shared/AddEnumerationDialog';
import EnumerationTable from '../shared/EnumerationTable';
import CatalogViewActions from './CatalogViewActions';

const CatalogView: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showError } = useError();
  const { category } = useParams<{ category?: string }>();
  const [enumerations, setEnumerations] = useState<Enumeration[]>();
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);

  const bindEnumerations = (category: string) => {
    fetchEnumerations(`category==${category}`, 0, 1000)
      .then((response) => setEnumerations(response.content))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (category) {
      bindEnumerations(category);
    }
  }, [category]);

  if (!category || !enumerations) return <p>Loading realm...</p>;

  return (
    <>
      <CatalogViewActions onRefresh={() => bindEnumerations(category!)} />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CategorySeparator text={t(category)}>
            <AddButton onClick={() => setAddDialogOpen(true)} />
          </CategorySeparator>
          <EnumerationTable enumerations={enumerations} setEnumerations={setEnumerations} />
          <TechnicalInfo>
            <pre>{JSON.stringify(enumerations, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
      <AddEnumerationDialog
        category={category}
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={(item) => bindEnumerations(category)}
      />
    </>
  );
};

export default CatalogView;
