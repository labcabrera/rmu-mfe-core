import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  CancelButton,
  createRealm,
  CreateRealmDto,
  EditableAvatar,
  LayoutBase,
  Realm,
  SaveButton,
  TechnicalInfo,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { DEFAULT_REALM_IMAGE } from '../../services/image-service';
import RealmForm from '../shared/RealmForm';

export default function RealmCreation() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();

  const [formData, setFormData] = useState<Realm>({
    imageUrl: DEFAULT_REALM_IMAGE,
  } as unknown as Realm);
  const [isValid, setIsValid] = useState(false);

  const validateForm = (formData: CreateRealmDto) => {
    if (!formData.name) return false;
    if (!formData.accessType) return false;
    if (!formData.magicPresence) return false;
    return true;
  };

  const onSave = () => {
    createRealm(formData, auth)
      .then((realm) => navigate(`/core/realms/view/${realm.id}`))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    setIsValid(validateForm(formData));
  }, [formData]);

  if (!formData) return <div>Loading...</div>;

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('core'), link: '/core' },
        { name: t('realms'), link: '/core/realms' },
        { name: t('creation') },
      ]}
      actions={[
        <CancelButton onClick={() => navigate(`/core/realms`)} />,
        <SaveButton onClick={onSave} disabled={!isValid} />,
      ]}
      leftPanel={
        <EditableAvatar
          imageUrl={formData.imageUrl || DEFAULT_REALM_IMAGE}
          onImageChange={(newImageUrl) => setFormData({ ...formData, imageUrl: newImageUrl })}
        />
      }
    >
      <RealmForm formData={formData} setFormData={setFormData} />
      <TechnicalInfo>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </TechnicalInfo>
    </LayoutBase>
  );
}
