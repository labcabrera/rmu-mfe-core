import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  EditableAvatar,
  Realm,
  fetchRealm,
  LayoutBase,
  CancelButton,
  SaveButton,
  updateRealm,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { imageBaseUrl } from '../../services/config';
import { getAvatarImages } from '../../services/image-service';
import RealmForm from '../shared/RealmForm';

const RealmEdit: FC = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showError } = useError();
  const { realmId } = useParams<{ realmId?: string }>();
  const [realm, setRealm] = useState<Realm | null>(null);
  const [formData, setFormData] = useState<Realm>({} as unknown as Realm);

  const onSave = () => {
    updateRealm(realm!.id, formData, auth)
      .then((response) => navigate(`/core/realms/view/${response.id}`, { state: { realm: response } }))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (!realm) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { id, ...rest } = realm;
    setFormData(rest as unknown as Realm);
  }, [realm]);

  useEffect(() => {
    if (location.state && location.state.realm) {
      setRealm(location.state.realm);
    } else if (realmId) {
      fetchRealm(realmId, auth)
        .then((response) => setRealm(response))
        .catch((err) => showError(err.message));
    }
  }, [location.state, realmId, showError]);

  if (!realm || !formData) return <div>Loading realm...</div>;

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('realms'), link: '/core/realms' },
        { name: t('edit') },
      ]}
      actions={[
        <CancelButton onClick={() => navigate(`/core/realms/view/${realm.id}`, { state: { realm } })} />,
        <SaveButton onClick={onSave} />,
      ]}
      leftPanel={
        <EditableAvatar
          imageUrl={`${imageBaseUrl}images/generic/realm.png`}
          images={getAvatarImages()}
          onImageChange={(imageUrl) => setFormData({ ...formData, imageUrl: imageUrl })}
        />
      }
    >
      <RealmForm formData={formData} setFormData={setFormData} />
    </LayoutBase>
  );
};

export default RealmEdit;
