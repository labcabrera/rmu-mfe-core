import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import {
  createCulture,
  CreateCultureDto,
  Culture,
  CultureSkillRank,
  EditableAvatar,
  fetchCulture,
  FormPage,
  LoadingState,
  TechnicalInfo,
  updateCulture,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { FormMode, useFormData } from '../../shared/form/useFormData';
import CultureDevelopmentCost from '../shared/CultureDevelopmentCost';
import CultureForm from './CultureForm';

const EMPTY_CULTURE = {
  name: '',
  skillRanks: [] as CultureSkillRank[],
  languages: [] as string[],
  suggestedCrafts: '',
  suggestedVocations: '',
  description: '',
  imageUrl: 'images/generic/cultures.png',
  accessType: 'private',
} as Culture;

const isValid = (culture: Culture) => !!culture.name && !!culture.accessType;

const toForm = (culture: Culture) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { id, developmentCost, owner, ...rest } = culture;
  return rest as Culture;
};

/** Create and edit page of a culture. */
export default function CultureFormPage({ mode }: { mode: FormMode }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { cultureId } = useParams<{ cultureId?: string }>();
  const existing = useEntity<Culture>(mode === 'edit' ? cultureId : undefined, (id) => fetchCulture(id, auth), {
    initial: location.state?.culture,
    onError: notify.error,
  });
  const { formData, setFormData, dirty } = useFormData<Culture>(mode, existing.entity, () => EMPTY_CULTURE, toForm);

  const onSave = () => {
    if (!formData) return;
    const request =
      mode === 'create' ? createCulture(formData as CreateCultureDto, auth) : updateCulture(cultureId!, formData, auth);
    request
      .then((culture) => navigate(`/core/cultures/view/${culture.id}`, { state: { culture } }))
      .catch(notify.error);
  };

  const onCancel = () =>
    mode === 'create'
      ? navigate('/core/cultures')
      : navigate(`/core/cultures/view/${cultureId}`, { state: existing.entity && { culture: existing.entity } });

  return (
    <FormPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('cultures'), link: '/core/cultures' },
        { name: t(mode === 'create' ? 'creation' : 'edit') },
      ]}
      onSave={onSave}
      onCancel={onCancel}
      saveDisabled={!formData || !isValid(formData)}
      dirty={dirty}
      leftPanel={
        formData && (
          <>
            <EditableAvatar
              imageUrl={formData.imageUrl || ''}
              onImageChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
            />
            {mode === 'edit' && (
              <Box sx={{ mt: 2 }}>
                <CultureDevelopmentCost cost={existing.entity?.developmentCost} />
              </Box>
            )}
          </>
        )
      }
    >
      {formData ? (
        <>
          <CultureForm formData={formData} setFormData={setFormData} />
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
