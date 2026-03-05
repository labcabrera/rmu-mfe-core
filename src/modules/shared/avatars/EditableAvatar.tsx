import React, { FC, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { getAvatarImages } from '../../services/image-service';
import ImageSelectorDialog from '../images/ImageSelectorDialog';

const EditableAvatar: FC<{
  imageUrl: string;
  onImageChange: (newImageUrl: string) => void;
  variant?: 'circular' | 'rounded' | 'square';
}> = ({ imageUrl, onImageChange, variant = 'circular' }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Avatar
        src={imageUrl}
        variant={variant}
        sx={{
          width: {
            xs: 80,
            sm: 56,
            md: 72,
            lg: 96,
          },
          height: {
            xs: 80,
            sm: 56,
            md: 72,
            lg: 96,
          },
        }}
        onClick={() => setDialogOpen(true)}
      />
      <ImageSelectorDialog
        open={dialogOpen}
        images={getAvatarImages()}
        onClose={() => setDialogOpen(false)}
        onSelect={(image) => onImageChange(image)}
      />
    </>
  );
};

export default EditableAvatar;
