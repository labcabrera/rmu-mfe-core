import React, { FC, ReactNode } from 'react';
import { alpha, Box, Typography } from '@mui/material';

/** The result of a maneuver, with a left border and a tint in the color of the result. */
const ManeuverResultCard: FC<{
  title: string;
  color: 'error' | 'warning' | 'info' | 'success' | 'secondary';
  message?: string;
  children?: ReactNode;
}> = ({ title, color, message, children }) => (
  <Box
    role="status"
    sx={{
      p: 2,
      borderLeft: 4,
      borderColor: `${color}.main`,
      borderRadius: 1,
      bgcolor: (theme) => alpha(theme.palette[color].main, 0.08),
    }}
  >
    <Typography variant="h6" color={`${color}.main`} sx={{ fontWeight: 700 }}>
      {title}
    </Typography>
    {message && (
      <Typography variant="body2" sx={{ mt: 0.5 }}>
        {message}
      </Typography>
    )}
    {children}
  </Box>
);

export default ManeuverResultCard;
