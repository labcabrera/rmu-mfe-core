import React, { Dispatch, FC, SetStateAction } from 'react';
import { Chip, Stack, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { updateProfession } from '../../api/profession';
import { Profession, UpdateProfessionDto } from '../../api/profession.dto';
import EditableAvatar from '../../shared/avatars/EditableAvatar';

const ProfessionViewResume: FC<{
  profession: Profession;
  setProfession: Dispatch<SetStateAction<Profession | undefined>>;
}> = ({ profession, setProfession }) => {
  const { showError } = useError();

  if (!profession) return <p>Loading...</p>;

  const onUpdateImage = (imageUrl: string) => {
    const dto = { imageUrl } as UpdateProfessionDto;
    updateProfession(profession!.id, dto)
      .then((updatedProfession) => setProfession(updatedProfession))
      .catch((err: Error) => showError(err.message));
  };

  return (
    <>
      <EditableAvatar imageUrl={profession.imageUrl || ''} onImageChange={(avatar) => onUpdateImage(avatar)} />
      <Stack direction="row" spacing={1} mt={2}>
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
      <Typography variant="body2" color="primary" gutterBottom>
        {t(profession.archetype)}
      </Typography>
      <Typography variant="body2" color="secondary">
        {t(profession.description)}
      </Typography>
    </>
  );
};

export default ProfessionViewResume;
