import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Chip, Stack, Tooltip, Typography } from '@mui/material';
import {
  AccessTypeChip,
  canEditEntity,
  canManageEntity,
  deleteRealm,
  DetailPage,
  EntityAccessChip,
  entityAccessChipKey,
  EntitySourceChip,
  fetchFriends,
  fetchRealm,
  Friend,
  ShareDialog,
  ShareLevel,
  shareRealm,
  unshareRealm,
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
  const [shareOpen, setShareOpen] = useState(false);
  const [friends, setFriends] = useState<Friend[]>();

  // Spec 069: writers edit the realm (rulebook ones only admins); its owner and admins also delete and share it.
  const editable = canEditEntity(state.entity, auth);
  const manageable = canManageEntity(state.entity, auth);
  // Shared with the user (a chip of access and no manage): the user can give the access up.
  const sharedWithMe = !manageable && !!entityAccessChipKey(state.entity);

  useEffect(() => {
    if (!shareOpen || friends) return;
    fetchFriends(auth)
      .then(setFriends)
      .catch((err) => {
        setFriends([]);
        notify.error(err);
      });
  }, [shareOpen, friends, auth, notify]);

  const onShare = (realm: Realm, userId: string, level: ShareLevel) =>
    shareRealm(realm.id, userId, level, auth).then(state.setEntity).catch(notify.error);

  const onUnshare = (realm: Realm, userId: string) =>
    unshareRealm(realm.id, userId, auth).then(state.setEntity).catch(notify.error);

  const onGiveUp = (realm: Realm) => {
    const me = auth.user?.profile?.sub;
    if (!me) return;
    unshareRealm(realm.id, me, auth)
      .then(() => navigate('/core/realms'))
      .catch(notify.error);
  };

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
      onDelete={manageable ? onDelete : undefined}
      actions={(realm) => [
        ...(manageable
          ? [
              <Button key="share" variant="outlined" startIcon={<GroupAddIcon />} onClick={() => setShareOpen(true)}>
                {t('share')}
              </Button>,
            ]
          : []),
        ...(sharedWithMe
          ? [
              <Button
                key="give-up"
                variant="outlined"
                color="warning"
                startIcon={<LogoutIcon />}
                onClick={() => onGiveUp(realm)}
              >
                {t('share-give-up')}
              </Button>,
            ]
          : []),
      ]}
      hero={(realm) => ({
        title: realm.name,
        overline: t('realm'),
        image: realm.imageUrl || DEFAULT_REALM_IMAGE,
        ...(editable ? { onImageClick: () => setImageDialogOpen(true), imageActionLabel: t('change-image') } : {}),
        chips: [
          <AccessTypeChip key="access" accessType={realm.accessType} />,
          <EntitySourceChip key="source" entity={realm} />,
          <EntityAccessChip key="shared" entity={realm} />,
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
          {manageable && (
            <ShareDialog
              open={shareOpen}
              onClose={() => setShareOpen(false)}
              entityName={realm.name}
              shares={realm.shares ?? []}
              friends={friends}
              system={realm.entitySource === 'system'}
              onShare={(userId, level) => onShare(realm, userId, level)}
              onUnshare={(userId) => onUnshare(realm, userId)}
            />
          )}
        </Stack>
      )}
    </DetailPage>
  );
}
