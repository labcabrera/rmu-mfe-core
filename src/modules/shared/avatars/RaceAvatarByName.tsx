import React, { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import { resolveRaceImage } from '../../services/race-avatar-service';

//TODO read imageUrl from model

const RaceAvatarByName: FC<{
  raceName?: string;
  variant?: 'circular' | 'rounded' | 'square';
}> = ({ raceName, variant = 'circular' }) => {
  return (
    <Avatar
      src={resolveRaceImage(raceName)}
      variant={variant}
      sx={{
        width: {
          xs: 80,
          sm: 56,
          md: 72,
          lg: 250,
        },
        height: {
          xs: 80,
          sm: 56,
          md: 72,
          lg: 250,
        },
      }}
    />
  );
};

export default RaceAvatarByName;
