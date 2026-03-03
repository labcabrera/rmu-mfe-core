import React, { FC } from 'react';
import { Box, Divider, Typography } from '@mui/material';

const CategorySeparator: FC<{ text: string }> = ({ text }) => {
  return (
    <Box mb={1} mt={2}>
      <Typography variant="subtitle2" color="text.secondary">
        {text}
      </Typography>
      <Divider sx={{ mt: 1 }} />
    </Box>
  );
};

export default CategorySeparator;
