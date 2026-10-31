/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  createRace,
  CreateRaceDto,
  EntityImage,
  fetchRace,
  FormPage,
  LoadingState,
  Race,
  TechnicalInfo,
  updateRace,
  UpdateRaceDto,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { FormMode, useFormData } from '../../shared/form/useFormData';
import RaceForm from './RaceForm';
import RaceFormRealmPicker from './RaceFormRealmPicker';

const EMPTY_RACE = {
  name: '',
  realmId: '',
  archetype: '',
  sizeId: 'medium',
  stats: {
    ag: 0,
    co: 0,
    em: 0,
    in: 0,
    me: 0,
    pr: 0,
    qu: 0,
    re: 0,
    sd: 0,
    st: 0,
  },
  resistances: {
    channeling: 0,
    mentalism: 0,
    essence: 0,
    physical: 0,
    poison: 0,
    disease: 0,
    fear: 0,
  },
  averageHeight: {
    male: 0,
    female: 0,
  },
  averageWeight: {
    male: 0,
    female: 0,
  },
  strideBonus: 0,
  enduranceBonus: 0,
  recoveryMultiplier: 1,
  baseHits: 0,
  baseDevPoints: 0,
  baseAt: 1,
  talents: [],
  traits: [],
  defaultLanguage: null,
  description: '',
  imageUrl: 'images/races/unknown.png',
} as unknown as Race;

/**
 * Create and edit page of a race. A new race belongs to the realm given by the `realmId` query param;
 * without it the page asks for the realm first.
 */
export default function RaceFormPage({ mode }: { mode: FormMode }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { raceId } = useParams<{ raceId?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryRealmId = searchParams.get('realmId');
  const existing = useEntity<Race>(mode === 'edit' ? raceId : undefined, (id) => fetchRace(id, auth), {
    initial: location.state?.race,
    onError: notify.error,
  });
  const { formData, setFormData, dirty } = useFormData<Race>(mode, existing.entity, () => ({
    ...EMPTY_RACE,
    realmId: queryRealmId || '',
  }));

  // The realm can be picked after the page opened (see RaceFormRealmPicker).
  useEffect(() => {
    if (mode === 'create' && formData && queryRealmId && formData.realmId !== queryRealmId) {
      setFormData({ ...formData, realmId: queryRealmId });
    }
  }, [queryRealmId]);

  if (mode === 'create' && !queryRealmId) {
    return (
      <RaceFormRealmPicker
        onSelect={(id) =>
          setSearchParams((params) => {
            params.set('realmId', id);
            return params;
          })
        }
      />
    );
  }

  const onSave = () => {
    if (!formData) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { id, ...rest } = formData;
    const request =
      mode === 'create'
        ? createRace(formData as unknown as CreateRaceDto, auth)
        : updateRace(raceId!, rest as unknown as UpdateRaceDto, auth);
    request.then((race) => navigate(`/core/races/view/${race.id}`, { state: { race } })).catch(notify.error);
  };

  const onCancel = () =>
    mode === 'create'
      ? navigate('/core/races')
      : navigate(`/core/races/view/${raceId}`, { state: existing.entity && { race: existing.entity } });

  return (
    <FormPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('races'), link: '/core/races' },
        { name: t(mode === 'create' ? 'create' : 'edit') },
      ]}
      onSave={onSave}
      onCancel={onCancel}
      saveDisabled={!formData || (mode === 'create' && (!formData.name || !formData.realmId))}
      dirty={dirty}
      leftPanel={
        formData && (
          <EntityImage
            image={formData.imageUrl || ''}
            onImageChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
          />
        )
      }
    >
      {formData && formData.realmId ? (
        <>
          <RaceForm realmId={formData.realmId} formData={formData} setFormData={setFormData} />
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
