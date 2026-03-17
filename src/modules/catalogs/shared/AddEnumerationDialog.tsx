import React, { FC, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { createEnumeration } from '../../api/enumerations';
import { CreateEnumerationDto, Enumeration } from '../../api/enumerations.dto';

type Props = {
  open: boolean;
  category: string;
  onClose: () => void;
  onAdd: (createdEnumeration: Enumeration) => void;
};

const AddEnumerationDialog: FC<Props> = ({ open, category, onClose, onAdd }) => {
  const { showError } = useError();
  const [form, setForm] = useState<CreateEnumerationDto>({
    category: category,
    name: '',
    realmId: null,
    accessType: 'public',
  });

  const onSave = () => {
    createEnumeration(form!)
      .then((data) => onAdd(data))
      .catch((err) => showError(err.message));
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
      <DialogTitle>{t('Add enumeration')}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label={t('Name')}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              fullWidth
              size="small"
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label={t('Realm Id')}
              value={form.realmId ?? ''}
              onChange={(e) => setForm({ ...form, realmId: e.target.value || null })}
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('Cancel')}</Button>
        <Button onClick={onSave} variant="contained" disabled={!form.name}>
          {t('Add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEnumerationDialog;
