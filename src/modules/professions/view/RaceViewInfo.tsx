import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Race } from '../../api/race.dto';

type RaceViewInfoProps = {
  race: Race;
};

const RaceViewInfo: React.FC<RaceViewInfoProps> = ({ race }) => {
  const { t } = useTranslation();

  return (
    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '100%' } }}>
      <TextField label={t('strategic-game')} name="strategicGame" value={race?.name || ''} variant="standard" />
      <TextField label={t('description')} name="description" value={race.description} multiline maxRows={4} variant="standard" />
    </Box>
  );
};

export default RaceViewInfo;
