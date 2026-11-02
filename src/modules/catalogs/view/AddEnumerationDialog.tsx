import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Button, Grid, TextField } from '@mui/material';
import {
  createEnumeration,
  CreateEnumerationDto,
  EntitySourceField,
  Realm,
  RealmPicker,
  resetEnumerationNames,
  RmuDialog,
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
    <RmuDialog
      open={open}
      title={t('add-enumeration')}
      maxWidth="sm"
      onDismiss={onClose}
      buttons={[
        <Button key="cancel" onClick={onClose}>
          {t('cancel')}
        </Button>,
        <Button key="add" onClick={onSave} variant="contained" disabled={!toKey(form.name)}>
          {t('add')}
        </Button>,
      ]}
    >
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
        {/* Spec 063: admins only; the API stores `user` when it is not sent. */}
        <Grid size={{ xs: 12 }}>
          <EntitySourceField
            value={form.entitySource}
            onChange={(entitySource) => setForm({ ...form, entitySource })}
          />
        </Grid>
      </Grid>
    </RmuDialog>
  );
};

export default AddEnumerationDialog;
