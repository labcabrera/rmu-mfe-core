import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { List, ListItemButton, ListItemText, Typography } from '@mui/material';

const HomePage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h6" color="primary">
        {t('core')}
      </Typography>
      <List>
        <ListItemButton onClick={() => navigate(`/core/realms`)}>
          <ListItemText primary={t('realms')} />
        </ListItemButton>
        <ListItemButton onClick={() => navigate(`/core/traits`)}>
          <ListItemText primary={t('traits')} />
        </ListItemButton>
      </List>
    </>
  );
};

export default HomePage;
