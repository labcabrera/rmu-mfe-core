import React, { FC } from 'react';
import Avatar from '@mui/material/Avatar';

const RaceAvatarByName: FC<{
  raceName?: string;
  size?: number;
  variant?: 'circular' | 'rounded' | 'square';
}> = ({ raceName, variant = 'circular', size = 70 }) => {
  const defaultImage = '/static/images/races/unknown.png';

  const resolveImage = (): string => {
    if (!raceName) {
      return defaultImage;
    }
    //TODO service map
    const check = raceName.toLowerCase();
    if (check.includes('noldor')) return '/static/images/races/generic-high-elf-01.png';
    if (check.includes('sindar')) return '/static/images/races/generic-grey-elf-01.png';
    if (check.includes('dúnedain')) return '/static/images/races/generic-high-man-01.png';

    if (check.includes('orc')) return '/static/images/races/generic-orc-01.png';
    if (check.includes('human')) return '/static/images/races/generic-human-01.png';
    if (check.includes('troll')) return '/static/images/races/generic-troll-01.png';
    if (check.includes('dwarf')) return '/static/images/races/generic-dwarf-01.png';
    if (check.includes('elf')) return '/static/images/races/generic-elf-01.png';
    return defaultImage;
  };

  return (
    <Avatar
      src={resolveImage()}
      variant={variant}
      sx={{
        width: size,
        height: size,
      }}
    />
  );
};

export default RaceAvatarByName;
