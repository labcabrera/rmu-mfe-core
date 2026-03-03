import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { imageBaseUrl } from '../../services/config';
import RmuCard from './RmuCard';

const RmuTextCard: FC<{
  value: string | number;
  subtitle: string;
  image?: string;
  size?: 'small' | 'medium';
  onClick?: () => void;
}> = ({ value, subtitle, size = 'small', image = `${imageBaseUrl}images/generic/configuration.png`, onClick }) => {
  return (
    <RmuCard image={image} onClick={onClick} size={size}>
      <Typography
        component="div"
        variant="h6"
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%',
          maxWidth: '100%',
          display: 'block',
        }}
      >
        {value}
      </Typography>
      <Typography
        variant="subtitle1"
        component="div"
        sx={{
          fontSize: '1rem',
          color: 'text.secondary',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%',
          maxWidth: '100%',
          display: 'block',
        }}
      >
        {subtitle}
      </Typography>
    </RmuCard>
  );
};

export default RmuTextCard;
