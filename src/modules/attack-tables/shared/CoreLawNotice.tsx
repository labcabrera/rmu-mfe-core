import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from '@mui/material';

/** The whole tables are rulebook content: shown when the user has no Core Law access. */
const CoreLawNotice: FC = () => {
  const { t } = useTranslation();
  return <Alert severity="info">{t('combat-tables-core-law-required')}</Alert>;
};

export default CoreLawNotice;
