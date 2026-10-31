import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  createRealm,
  EntityImage,
  fetchRealm,
  FormPage,
  LoadingState,
  Realm,
  TechnicalInfo,
  updateRealm,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { DEFAULT_REALM_IMAGE_PATH } from '../../services/image-service';
import { FormMode, useFormData } from '../../shared/form/useFormData';
import RealmForm from './RealmForm';

const isValid = (realm: Realm) => !!realm.name && !!realm.accessType && !!realm.magicPresence;

// The form never sends the id: it is in the URL.
const toForm = (realm: Realm) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { id, ...rest } = realm;
  return rest as unknown as Realm;
};

/** Create and edit page of a realm. */
export default function RealmFormPage({ mode }: { mode: FormMode }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { realmId } = useParams<{ realmId?: string }>();
  const existing = useEntity<Realm>(mode === 'edit' ? realmId : undefined, (id) => fetchRealm(id, auth), {
    initial: location.state?.realm,
    onError: notify.error,
  });
  const { formData, setFormData, dirty } = useFormData<Realm>(
    mode,
    existing.entity,
    () => ({ imageUrl: DEFAULT_REALM_IMAGE_PATH }) as unknown as Realm,
    toForm
  );

  const onSave = () => {
    if (!formData) return;
    const request = mode === 'create' ? createRealm(formData, auth) : updateRealm(realmId!, formData, auth);
    request.then((realm) => navigate(`/core/realms/view/${realm.id}`, { state: { realm } })).catch(notify.error);
  };

  const onCancel = () =>
    mode === 'create'
      ? navigate('/core/realms')
      : navigate(`/core/realms/view/${realmId}`, { state: existing.entity && { realm: existing.entity } });

  return (
    <FormPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('realms'), link: '/core/realms' },
        { name: t(mode === 'create' ? 'creation' : 'edit') },
      ]}
      onSave={onSave}
      onCancel={onCancel}
      saveDisabled={!formData || !isValid(formData)}
      dirty={dirty}
      leftPanel={
        formData && (
          <EntityImage
            image={formData.imageUrl}
            fallbackImages={[DEFAULT_REALM_IMAGE_PATH]}
            onImageChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
          />
        )
      }
    >
      {formData ? (
        <>
          <RealmForm formData={formData} setFormData={setFormData} />
          <TechnicalInfo>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </>
      ) : (
        <LoadingState variant="detail" />
      )}
    </FormPage>
  );
}
