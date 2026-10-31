import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import {
  createProfession,
  CreateProfessionDto,
  EntityImage,
  fetchProfession,
  FormPage,
  LoadingState,
  Profession,
  TechnicalInfo,
  updateProfession,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { FormMode, useFormData } from '../../shared/form/useFormData';
import ProfessionForm from './ProfessionForm';

const EMPTY_PROFESSION = {
  id: '',
  archetype: 'non-spellcaster',
  fixedRealmTypes: [],
  availableRealmTypes: [],
  skillCosts: {
    animal: [],
    awareness: [],
    'battle-expertise': [],
    'body-discipline': [],
    brawn: [],
    'combat-expertise': [],
    combat1: [],
    combat2: [],
    combat3: [],
    combat4: [],
    composition: [],
    crafting: [],
    delving: [],
    environmental: [],
    gymnastic: [],
    lore: [],
    'magical-expertise': [],
    medical: [],
    'mental-discipline': [],
    movement: [],
    'performance-art': [],
    'power-manipulation': [],
    science: [],
    social: [],
    'spells-base-open': [],
    'spells-ritual-magic': [],
    'spells-closed': [],
    'spells-arcane': [],
    'spells-restricted': [],
    subterfuge: [],
    technical: [],
    vocation: [],
  },
  professionalSkills: [],
  description: '',
  imageUrl: 'images/generic/configuration.png',
} as unknown as Profession;

// The id is the profession's name: it is set on creation and comes from the URL when editing.
const toForm = (profession: Profession) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { id, ...rest } = profession;
  return rest as Profession;
};

/** Create and edit page of a profession. */
export default function ProfessionFormPage({ mode }: { mode: FormMode }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { professionId } = useParams<{ professionId?: string }>();
  const existing = useEntity<Profession>(
    mode === 'edit' ? professionId : undefined,
    (id) => fetchProfession(id, auth),
    { initial: location.state?.profession, onError: notify.error }
  );
  const { formData, setFormData, dirty } = useFormData<Profession>(
    mode,
    existing.entity,
    () => EMPTY_PROFESSION,
    toForm
  );

  const onSave = () => {
    if (!formData) return;
    const request =
      mode === 'create'
        ? createProfession(formData as unknown as CreateProfessionDto, auth)
        : updateProfession(professionId!, formData, auth);
    request
      .then((profession) => navigate(`/core/professions/view/${profession.id}`, { state: { profession } }))
      .catch(notify.error);
  };

  const onCancel = () =>
    mode === 'create'
      ? navigate('/core/professions')
      : navigate(`/core/professions/view/${professionId}`, {
          state: existing.entity && { profession: existing.entity },
        });

  return (
    <FormPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('professions'), link: '/core/professions' },
        { name: t(mode === 'create' ? 'creation' : 'edit') },
      ]}
      onSave={onSave}
      onCancel={onCancel}
      saveDisabled={!formData || (mode === 'create' && !formData.id)}
      dirty={dirty}
      leftPanel={
        formData && (
          <>
            <EntityImage
              image={formData.imageUrl || ''}
              onImageChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
            />
            {mode === 'edit' && (
              <Typography variant="h6" sx={{ mt: 2 }}>
                {t(professionId!)}
              </Typography>
            )}
          </>
        )
      }
    >
      {formData ? (
        <>
          <ProfessionForm formData={formData} setFormData={setFormData} creationMode={mode === 'create'} />
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
