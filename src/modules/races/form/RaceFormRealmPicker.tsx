/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import {
  CancelButton,
  fetchRealms,
  LayoutBase,
  Realm,
  SelectRealm,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';

// Shown when the creation page is opened without a realmId query param.
const RaceFormRealmPicker: FC<{ onSelect: (realmId: string) => void }> = ({ onSelect }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotify();
  const [realms, setRealms] = useState<Realm[]>([]);

  useEffect(() => {
    fetchRealms('', 0, 100, auth)
      .then((response) => setRealms(response.content))
      .catch((err) => notify.error(err));
  }, []);

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('races'), link: '/core/races' },
        { name: t('create') },
      ]}
      actions={[<CancelButton onClick={() => navigate('/core/races')} />]}
    >
      <Stack spacing={2} sx={{ maxWidth: 480 }}>
        <Typography>{t('select-realm-to-continue')}</Typography>
        <SelectRealm realms={realms} value={null} onChange={(realmId) => realmId && onSelect(realmId)} required />
      </Stack>
    </LayoutBase>
  );
};

export default RaceFormRealmPicker;
