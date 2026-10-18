import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  createSkill,
  CreateSkillDto,
  fetchSkill,
  FormPage,
  GenericAvatar,
  imageBaseUrl,
  LoadingState,
  Skill,
  TechnicalInfo,
  updateSkill,
  UpdateSkillDto,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { FormMode, useFormData } from '../../shared/form/useFormData';
import SkillForm from './SkillForm';

const EMPTY_SKILL = {
  id: '',
  categoryId: '',
  bonus: [],
  specialization: '',
  accessType: 'public',
} as unknown as Skill;

// The id is set on creation and comes from the URL when editing.
const toForm = (skill: Skill) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { id, ...rest } = skill;
  return rest as unknown as Skill;
};

/** Create and edit page of a skill. */
export default function SkillFormPage({ mode }: { mode: FormMode }) {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { skillId } = useParams<{ skillId?: string }>();
  const existing = useEntity<Skill>(mode === 'edit' ? skillId : undefined, (id) => fetchSkill(id, auth), {
    initial: location.state?.skill,
    onError: notify.error,
  });
  const { formData, setFormData, dirty } = useFormData<Skill>(mode, existing.entity, () => EMPTY_SKILL, toForm);

  const isValid = !!formData?.categoryId && (mode === 'edit' || !!formData.id);

  const onSave = () => {
    if (!formData) return;
    const request =
      mode === 'create'
        ? createSkill(formData as unknown as CreateSkillDto, auth)
        : updateSkill(skillId!, formData as unknown as UpdateSkillDto, auth);
    request.then((skill) => navigate(`/core/skills/view/${skill.id}`, { state: { skill } })).catch(notify.error);
  };

  return (
    <FormPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('skill-categories'), link: '/core/skill-categories' },
        { name: t('skills'), link: '/core/skills' },
        { name: t(mode === 'create' ? 'creation' : 'edit') },
      ]}
      onSave={onSave}
      onCancel={() => navigate('/core/skills')}
      saveDisabled={!isValid}
      dirty={dirty}
      leftPanel={
        mode === 'edit' ? <GenericAvatar imageUrl={`${imageBaseUrl}images/generic/configuration.png`} /> : undefined
      }
    >
      {formData ? (
        <>
          <SkillForm formData={formData} setFormData={setFormData} create={mode === 'create'} />
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
