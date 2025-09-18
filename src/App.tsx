import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { ErrorProvider } from './ErrorContext';
import './i18n';
import RaceCreation from './modules/races/create/RaceCreation';
import RaceEdit from './modules/races/edit/RaceEdit';
import RaceView from './modules/races/view/RaceView';
import RealmCreation from './modules/realms/create/RealmCreation';
import RealmEdit from './modules/realms/edit/RealmEdit';
import RealmList from './modules/realms/list/RealmList';
import RealmView from './modules/realms/view/RealmView';

const App = () => {
  return (
    <ErrorProvider>
      <Box sx={{ p: 5 }}>
        <Routes>
          <Route path="/" element={<RealmList />} />
          <Route path="/realms" element={<RealmList />} />
          <Route path="/realms/create" element={<RealmCreation />} />
          <Route path="/realms/view/:realmId" element={<RealmView />} />
          <Route path="/realms/edit/:realmId" element={<RealmEdit />} />
          <Route path="/races/create" element={<RaceCreation />} />
          <Route path="/races/view/:raceId" element={<RaceView />} />
          <Route path="/races/edit/:raceId" element={<RaceEdit />} />
        </Routes>
      </Box>
    </ErrorProvider>
  );
};

export default App;
