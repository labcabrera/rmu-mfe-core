import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchEnumerationCategories } from '../../api/enumerations';
import { imageBaseUrl } from '../../services/config';
import RmuTextCard from '../../shared/cards/RmuTextCard';
import CatalogListActions from './CatalogListActions';

const RealmList: FC = () => {
  const { showError } = useError();
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  const bindCategories = () => {
    fetchEnumerationCategories()
      .then((response) => setCategories(response))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    bindCategories();
  }, []);

  const handleRealmClick = (category: string) => {
    navigate(`/core/catalogs/view/${category}`);
  };

  return (
    <>
      <CatalogListActions onRefresh={bindCategories} />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={1}>
            {categories.map((realm) => (
              <Grid size={{ xs: 12, md: 3 }} key={realm.id}>
                <RmuTextCard
                  value={realm}
                  subtitle={t('Category')}
                  image={`${imageBaseUrl}images/generic/configuration.png`}
                  onClick={() => handleRealmClick(realm)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RealmList;
