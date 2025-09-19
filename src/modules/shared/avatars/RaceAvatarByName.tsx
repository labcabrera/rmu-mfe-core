import React, { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import { resolveRaceImage } from '../../services/race-avatar-service';

const RaceAvatarByName: FC<{
  raceName?: string;
  size?: number;
  variant?: 'circular' | 'rounded' | 'square';
}> = ({ raceName, variant = 'circular', size = 70 }) => {
  return (
    <Avatar
      src={resolveRaceImage(raceName)}
      variant={variant}
      sx={{
        width: size,
        height: size,
      }}
    />
  );
};

export default RaceAvatarByName;
