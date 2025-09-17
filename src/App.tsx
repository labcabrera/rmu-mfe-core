import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { CombatProvider } from './CombatContext';
import { ErrorProvider } from './ErrorContext';
import './i18n';
import RaceCreation from './modules/races/create/RaceCreation';
import RaceEdit from './modules/races/edit/RaceEdit';
import RaceList from './modules/races/list/RaceList';
import RaceView from './modules/races/view/RaceView';

const App = () => {
  return (
    <ErrorProvider>
      <CombatProvider>
        <Box sx={{ p: 5 }}>
          <Routes>
            <Route path="/" element={<RaceList />} />
            <Route path="/races" element={<RaceList />} />
            <Route path="/races/create" element={<RaceCreation />} />
            <Route path="/races/view/:raceId" element={<RaceView />} />
            <Route path="/races/edit/:raceId" element={<RaceEdit />} />
          </Routes>
        </Box>
      </CombatProvider>
    </ErrorProvider>
  );
};

export default App;
