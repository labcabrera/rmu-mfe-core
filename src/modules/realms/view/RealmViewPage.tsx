import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Chip, Stack, Tooltip, Typography } from '@mui/material';
import {
  AccessTypeChip,
  canEditEntity,
  deleteRealm,
  DetailPage,
  EntitySourceChip,
  fetchRealm,
  ImageSelectorDialog,
  Realm,
  updateRealm,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { DEFAULT_REALM_IMAGE } from '../../services/image-service';
import RealmViewTabs from './RealmViewTabs';

export default function RealmViewPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { realmId } = useParams<{ realmId?: string }>();
  const state = useEntity<Realm>(realmId, (id) => fetchRealm(id, auth), {
    initial: location.state?.realm,
    onError: notify.error,
  });
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  // Spec 063: rulebook entities only for admins, user entities for their owner.
  const editable = canEditEntity(state.entity, auth);

  const onUpdateImage = (realm: Realm, imageUrl: string) =>
    updateRealm(realm.id, { imageUrl }, auth).then(state.setEntity).catch(notify.error);

  const onDelete = (realm: Realm) =>
    deleteRealm(realm.id, auth)
      .then(() => navigate('/core/realms'))
      .catch(notify.error);

  return (
    <DetailPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('realms'), link: '/core/realms' },
        { name: state.entity ? state.entity.name : t('view') },
      ]}
      entity={state}
      technicalInfo={false}
      onEdit={editable ? (realm) => navigate(`/core/realms/edit/${realm.id}`, { state: { realm } }) : undefined}
      onDelete={editable ? onDelete : undefined}
      hero={(realm) => ({
        title: realm.name,
        overline: t('realm'),
        image: realm.imageUrl || DEFAULT_REALM_IMAGE,
        ...(editable ? { onImageClick: () => setImageDialogOpen(true), imageActionLabel: t('change-image') } : {}),
        chips: [
          <AccessTypeChip key="access" accessType={realm.accessType} />,
          <EntitySourceChip key="source" entity={realm} />,
          ...(realm.generic
            ? [
                <Tooltip key="generic" title={t('realm-generic-help')}>
                  <Chip size="small" label={t('realm-generic')} color="info" variant="outlined" />
                </Tooltip>,
              ]
            : []),
        ],
      })}
    >
      {(realm) => (
        <Stack spacing={2}>
          {realm.description && (
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
              {realm.description}
            </Typography>
          )}
          <RealmViewTabs realm={realm} />
          <ImageSelectorDialog
            value={realm.imageUrl || undefined}
            open={imageDialogOpen}
            onClose={() => setImageDialogOpen(false)}
            onSelect={(image) => onUpdateImage(realm, image)}
          />
        </Stack>
      )}
    </DetailPage>
  );
}
