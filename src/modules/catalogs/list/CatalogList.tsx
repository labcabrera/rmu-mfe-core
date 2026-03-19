import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchEnumerationCategories } from '../../api/enumerations';
import { imageBaseUrl } from '../../services/config';
import { gridSizeResume, gridSizeMain, gridSizeCard } from '../../services/display';
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
        <Grid size={gridSizeResume}></Grid>
        <Grid size={gridSizeMain}>
          <Grid container spacing={1}>
            {categories.map((realm, index) => (
              <Grid size={gridSizeCard} key={index}>
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
