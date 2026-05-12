import React, { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Chip, Stack, Typography } from '@mui/material';
import {
  EditableAvatar,
  updateProfession,
  Profession,
  UpdateProfessionDto,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { getAvatarImages } from '../../services/image-service';

const ProfessionViewResume: FC<{
  profession: Profession;
  setProfession: Dispatch<SetStateAction<Profession | undefined>>;
}> = ({ profession, setProfession }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const { showError } = useError();

  if (!profession) return <p>Loading...</p>;

  const onUpdateImage = (imageUrl: string) => {
    const dto = { imageUrl } as UpdateProfessionDto;
    updateProfession(profession!.id, dto, auth)
      .then((updatedProfession) => setProfession(updatedProfession))
      .catch((err: Error) => showError(err.message));
  };

  return (
    <>
      <EditableAvatar
        imageUrl={profession.imageUrl || ''}
        onImageChange={(avatar) => onUpdateImage(avatar)}
        images={getAvatarImages()}
      />
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Chip
          label={t(profession.accessType)}
          color={profession.accessType === 'public' ? 'success' : 'error'}
          size="small"
          sx={{ mt: 2 }}
        />
        <Chip label={t(profession.archetype)} size="small" sx={{ mt: 2 }} />
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
