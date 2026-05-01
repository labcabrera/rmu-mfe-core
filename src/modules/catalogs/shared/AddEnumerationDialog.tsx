import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField } from '@mui/material';
import { Realm, CreateEnumerationDto, createEnumeration } from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import SelectRealm from '../../shared/selects/SelectRealm';

type Props = {
  open: boolean;
  category: string;
  realms: Realm[];
  onClose: () => void;
  onAdd: () => void;
};

const AddEnumerationDialog: FC<Props> = ({ open, category, realms, onClose, onAdd }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();
  const [form, setForm] = useState<CreateEnumerationDto>({
    category: category,
    key: '',
    realmId: null,
    accessType: 'public',
  });

  const onSave = () => {
    createEnumeration(form!, auth)
      .then(() => onAdd())
      .catch((err) => showError(err.message));
    setForm({
      category: category,
      key: '',
      realmId: null,
      accessType: 'public',
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('add-enumeration')}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label={t('key')}
              value={form.key}
              onChange={(e) => setForm({ ...form, key: e.target.value })}
              fullWidth
              size="small"
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <SelectRealm
              value={form.realmId || ''}
              onChange={(realmId) => setForm({ ...form, realmId: realmId })}
              realms={realms}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('cancel')}</Button>
        <Button onClick={onSave} variant="contained" disabled={!form.key}>
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEnumerationDialog;
