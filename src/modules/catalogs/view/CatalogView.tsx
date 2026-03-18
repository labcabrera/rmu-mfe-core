import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { deleteEnumeration, fetchEnumerations } from '../../api/enumerations';
import { Enumeration } from '../../api/enumerations.dto';
import { fetchRealms } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import { imageBaseUrl } from '../../services/config';
import AddButton from '../../shared/buttons/AddButton';
import DeleteButton from '../../shared/buttons/DeleteButton';
import RmuCard from '../../shared/cards/RmuCard';
import CategorySeparator from '../../shared/display/CategorySeparator';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
import AddEnumerationDialog from '../shared/AddEnumerationDialog';
import CatalogViewActions from './CatalogViewActions';

const CatalogView: FC = () => {
  const { showError } = useError();
  const { category } = useParams<{ category?: string }>();
  const [enumerations, setEnumerations] = useState<Enumeration[]>();
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const [realms, setRealms] = useState<Realm[]>();

  const bindRealms = () => {
    fetchRealms('', 0, 100)
      .then((response) => setRealms(response.content))
      .catch((err) => showError(err.message));
  };

  const bindEnumerations = (category: string) => {
    fetchEnumerations(`category==${category}`, 0, 1000)
      .then((response) => setEnumerations(response.content))
      .catch((err) => showError(err.message));
  };

  const onDelete = (enumeration: Enumeration) => {
    deleteEnumeration(enumeration.id)
      .then(() => bindEnumerations(category!))
      .catch((err) => showError(err.message));
  };

  const getRealmName = (enumeration: Enumeration): string | undefined => {
    return enumeration.realmId ? realms!.find((e) => e.id === enumeration.realmId)?.name : undefined;
  };

  useEffect(() => {
    if (category) {
      bindEnumerations(category);
    }
    bindRealms();
  }, [category]);

  if (!category || !enumerations || !realms) return <p>Loading realm...</p>;

  return (
    <>
      <CatalogViewActions onRefresh={() => bindEnumerations(category!)} />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CategorySeparator text={t(category)}>
            <AddButton onClick={() => setAddDialogOpen(true)} />
          </CategorySeparator>
          <Grid container spacing={1}>
            {enumerations.map((e) => (
              <Grid key={e.id} size={{ xs: 12, md: 3 }}>
                <RmuCard image={`${imageBaseUrl}images/generic/configuration.png`} size="small">
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="column">
                      <Typography>{e.key}</Typography>
                      <Typography color="secondary">
                        <em>{getRealmName(e)}</em>
                      </Typography>
                    </Stack>
                    <DeleteButton onClick={() => onDelete(e)} />
                  </Stack>
                </RmuCard>
              </Grid>
            ))}
          </Grid>
          <TechnicalInfo>
            <pre>{JSON.stringify(enumerations, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
      <AddEnumerationDialog
        category={category}
        realms={realms}
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={() => bindEnumerations(category)}
      />
    </>
  );
};

export default CatalogView;
