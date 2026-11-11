import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Alert, Stack, TextField } from '@mui/material';
import { copyRace, Race, Realm, RealmPicker, RmuDialog, useNotify } from '@labcabrera-rmu/rmu-react-shared-lib';
import { raceName } from '../race-format';

/**
 * Copies a race, with all its data, into one of `realms` (the realms the user writes, spec 074) under a new name; the
 * copy is a race of the user. The realm of the race comes selected when the user writes it.
 */
const CopyRaceDialog: FC<{
  race: Race;
  realms: Realm[];
  open: boolean;
  onClose: () => void;
  onCopied: (race: Race) => void;
}> = ({ race, realms, open, onClose, onCopied }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();
  const [name, setName] = useState('');
  const [realmId, setRealmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setName(`${raceName(race, t)} (${t('race-copy-suffix')})`);
    setRealmId(realms.some((realm) => realm.id === race.realmId) ? race.realmId : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, race.id]);

  const disabled = saving || !realmId || !name.trim();

  const onConfirm = () => {
    if (disabled) return;
    setSaving(true);
    copyRace(race.id, { name: name.trim(), realmId }, auth)
      .then(onCopied)
      .catch(notify.error)
      .finally(() => setSaving(false));
  };

  return (
    <RmuDialog
      open={open}
      title={t('race-copy')}
      maxWidth="sm"
      onCancel={onClose}
      onConfirm={onConfirm}
      onConfirmDisabled={disabled}
    >
      <Stack spacing={2} sx={{ pt: 1 }}>
        <Alert severity="info">{t('race-copy-help')}</Alert>
        <TextField label={t('name')} name="name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <RealmPicker variant="select" value={realmId} onChange={setRealmId} realms={realms} required />
      </Stack>
    </RmuDialog>
  );
};

export default CopyRaceDialog;
