import React, { FC } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const NumericCard: FC<{
  value: number;
  subtitle: string;
  image: string;
  maxWidth?: number;
  minWidth?: number;
  height?: number;
  imageSize?: number;
  grayscale?: number;
  onClick?: () => void;
}> = ({ value, subtitle, image, onClick, maxWidth = 200, minWidth = 200, height = 100, imageSize = 100, grayscale = 0.75 }) => {
  const getColor = (): string => {
    const red = '#ffab91';
    const green = '#a5d6a7';

    if (value > 0) return green;
    if (value < 0) return red;
    return 'inherit';
  };

  return (
    <Card
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        maxWidth: { maxWidth },
        minWidth: { minWidth },
        height: { height },
        cursor: 'pointer',
        transition: 'box-shadow 0.2s, background 0.2s',
        '&:hover': {
          boxShadow: 6,
          backgroundColor: 'action.hover',
        },
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={subtitle}
        sx={{ width: imageSize, height: imageSize, objectFit: 'cover', filter: `grayscale(${grayscale})` }}
      />
      <CardContent
        sx={{
          flex: 1,
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          ml: 2,
          maxWidth: '100%',
          minWidth: 0,
        }}
      >
        <Typography
          component="div"
          variant="h6"
          sx={{
            color: getColor(),
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
            //fontSize: '0.9rem',
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
      </CardContent>
    </Card>
  );
};

export default NumericCard;
