import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material';
import {
  AddButton,
  CategorySeparator,
  DeleteButton,
  RmuCard,
  TechnicalInfo,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { deleteEnumeration, fetchEnumerations } from '../../api/enumerations';
import { Enumeration } from '../../api/enumerations.dto';
import { fetchRealms } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import { imageBaseUrl } from '../../services/config';
import { gridSizeResume, gridSizeMain, gridSizeCard } from '../../services/display';
import AddEnumerationDialog from '../shared/AddEnumerationDialog';
import CatalogViewActions from './CatalogViewActions';
import CatalogListSearch from './CatalogViewSearch';

const CatalogView: FC = () => {
  const { showError } = useError();
  const { category } = useParams<{ category?: string }>();
  const [enumerations, setEnumerations] = useState<Enumeration[]>();
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const [realms, setRealms] = useState<Realm[]>();
  const [queryString, setQueryString] = useState<string>();

  const bindRealms = () => {
    fetchRealms('', 0, 100)
      .then((response) => setRealms(response.content))
      .catch((err) => showError(err.message));
  };

  const bindEnumerations = () => {
    if (!queryString) return;
    fetchEnumerations(queryString, 0, 1000)
      .then((response) => setEnumerations(response.content))
      .catch((err) => showError(err.message));
  };

  const onDelete = (enumeration: Enumeration) => {
    deleteEnumeration(enumeration.id)
      .then(() => bindEnumerations())
      .catch((err) => showError(err.message));
  };

  const getRealmName = (enumeration: Enumeration): string | undefined => {
    return enumeration.realmId ? realms!.find((e) => e.id === enumeration.realmId)?.name : undefined;
  };

  useEffect(() => {
    bindEnumerations();
  }, [queryString]);

  useEffect(() => {
    if (category) {
      setQueryString(`category==${category}`);
      // bindEnumerations();
    }
    bindRealms();
  }, [category]);

  if (!category || !enumerations || !realms) return <p>Loading realm...</p>;

  return (
    <>
      <CatalogViewActions onRefresh={() => bindEnumerations()} />
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <Grid container spacing={1}>
            <Grid size={12}>
              <CategorySeparator text={t(category)}>
                <AddButton onClick={() => setAddDialogOpen(true)} />
              </CategorySeparator>
            </Grid>
            <Grid size={12}>
              <CatalogListSearch category={category} realms={realms} setQueryString={setQueryString} />
            </Grid>
            <Grid size={12}>
              <Grid container spacing={1}>
                {enumerations.map((e, index) => (
                  <Grid key={index} size={gridSizeCard}>
                    <RmuCard image={`${imageBaseUrl}images/generic/configuration.png`} size="small">
                      <Stack direction="row" justifyContent="space-between">
                        <Stack direction="column">
                          <Typography>{t(e.key)}</Typography>
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
            </Grid>
            <Grid size={12}>
              <TechnicalInfo>
                <pre>{JSON.stringify(enumerations, null, 2)}</pre>
              </TechnicalInfo>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AddEnumerationDialog
        category={category}
        realms={realms}
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={() => bindEnumerations()}
      />
    </>
  );
};

export default CatalogView;
