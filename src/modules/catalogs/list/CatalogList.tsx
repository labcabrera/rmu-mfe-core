import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { fetchEnumerationCategories, LayoutBase, RmuTextCard } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import { gridSizeCard } from '../../services/display';

const RealmList: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  const bindCategories = () => {
    fetchEnumerationCategories(auth)
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
    <LayoutBase
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('catalogs') }]}
    >
      <Grid container spacing={1}>
        {categories.map((category, index) => (
          <Grid size={gridSizeCard} key={index}>
            <RmuTextCard
              value={t(category)}
              subtitle={t('category')}
              image={`${imageBaseUrl}images/generic/configuration.png`}
              onClick={() => handleRealmClick(category)}
            />
          </Grid>
        ))}
      </Grid>
    </LayoutBase>
  );
};

export default RealmList;
