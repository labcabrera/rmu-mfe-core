import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField } from '@mui/material';
import {
  createEnumeration,
  CreateEnumerationDto,
  Realm,
  RealmPicker,
  resetEnumerationNames,
  toKey,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';

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
  const notify = useNotify();
  const [form, setForm] = useState<CreateEnumerationDto>({
    category: category,
    name: '',
    realmId: null,
    accessType: 'public',
  });

  const onSave = () => {
    // The API derives the key from the name (spec 050)
    createEnumeration({ ...form, name: form.name.trim() }, auth)
      .then(() => {
        resetEnumerationNames();
        onAdd();
      })
      .catch((err) => notify.error(err));
    setForm({
      category: category,
      name: '',
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
              label={t('name')}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              fullWidth
              size="small"
              required
              helperText={`${t('enumeration-key')}: ${toKey(form.name) || '—'}. ${t('enumeration-key-help')}`}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <RealmPicker
              value={form.realmId || null}
              onChange={(realmId) => setForm({ ...form, realmId: realmId ?? '' })}
              realms={realms}
              allowAll
              allLabel={t('none')}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('cancel')}</Button>
        <Button onClick={onSave} variant="contained" disabled={!toKey(form.name)}>
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEnumerationDialog;
