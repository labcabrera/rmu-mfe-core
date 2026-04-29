/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material';
import {
  Realm,
  AddButton,
  CategorySeparator,
  DeleteButton,
  RmuCard,
  TechnicalInfo,
  fetchRealms,
  Enumeration,
  deleteEnumeration,
  fetchEnumerations,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import { gridSizeResume, gridSizeMain, gridSizeCard } from '../../services/display';
import AddEnumerationDialog from '../shared/AddEnumerationDialog';
import CatalogViewActions from './CatalogViewActions';
import CatalogListSearch from './CatalogViewSearch';
import { useAuth } from 'react-oidc-context';
import { useTranslation } from 'react-i18next';

const CatalogView: FC = () => {
  const auth = useAuth();
  const { showError } = useError();
  const { t } = useTranslation();
  const { category } = useParams<{ category?: string }>();
  const [enumerations, setEnumerations] = useState<Enumeration[]>();
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const [realms, setRealms] = useState<Realm[]>();
  const [queryString, setQueryString] = useState<string>();

  const bindRealms = () => {
    fetchRealms('', 0, 100, auth)
      .then((response) => setRealms(response.content))
      .catch((err) => showError(err.message));
  };

  const bindEnumerations = () => {
    if (!queryString) return;
    fetchEnumerations(queryString, 0, 1000, auth)
      .then((response) => setEnumerations(response.content))
      .catch((err) => showError(err.message));
  };

  const onDelete = (enumeration: Enumeration) => {
    deleteEnumeration(enumeration.id, auth)
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
    }
    bindRealms();
  }, [category]);

  if (!category || !enumerations || !realms) return <p>Loading realm...</p>;

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <CatalogViewActions onRefresh={() => bindEnumerations()} />
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
                    <RmuCard image={`${imageBaseUrl}images/generic/configuration.png`}>
                      <Stack direction="row" sx={{ justifyContent: "space-between"}}>
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
