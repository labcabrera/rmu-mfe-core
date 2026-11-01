import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Chip, Stack, Typography } from '@mui/material';
import {
  EntityImage,
  EntitySourceChip,
  LoadingState,
  Profession,
  updateProfession,
  UpdateProfessionDto,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';

const ProfessionViewResume: FC<{
  profession: Profession;
  setProfession: (profession: Profession) => void;
  /** Spec 063: without permission the image cannot be changed. */
  editable?: boolean;
}> = ({ profession, setProfession, editable = true }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const notify = useNotify();

  if (!profession) return <LoadingState />;

  const onUpdateImage = (imageUrl: string) => {
    const dto = { imageUrl } as UpdateProfessionDto;
    updateProfession(profession!.id, dto, auth)
      .then((updatedProfession) => setProfession(updatedProfession))
      .catch((err: Error) => notify.error(err));
  };

  return (
    <>
      <EntityImage
        image={profession.imageUrl || ''}
        onImageChange={editable ? (avatar) => onUpdateImage(avatar) : undefined}
      />
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Chip
          label={t(profession.accessType)}
          color={profession.accessType === 'public' ? 'success' : 'error'}
          sx={{ mt: 2 }}
        />
        <Chip label={t(profession.archetype)} sx={{ mt: 2 }} />
        <EntitySourceChip entity={profession} size="medium" />
      </Stack>
      <Typography variant="h6" color="primary" gutterBottom>
        {t(profession.id)}
      </Typography>
      <Typography variant="caption" color="secondary">
        {t(profession.description)}
      </Typography>
    </>
  );
};

export default ProfessionViewResume;
