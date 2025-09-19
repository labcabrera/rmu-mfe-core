import React, { FC } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const CardListItem: FC<{
  title: string;
  subtitle: string;
  image: string;
  onClick?: () => void;
}> = ({ title, subtitle, image, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        maxWidth: 400,
        minWidth: 400,
        height: 100,
        cursor: 'pointer',
        transition: 'box-shadow 0.2s, background 0.2s',
        '&:hover': {
          boxShadow: 6,
          backgroundColor: 'action.hover',
        },
      }}
    >
      <CardMedia component="img" image={image} alt={title} sx={{ width: 100, height: 100, objectFit: 'cover' }} />
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
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%',
            maxWidth: '100%',
            display: 'block',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
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

export default CardListItem;
