import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { ErrorProvider } from './ErrorContext';
import HomePage from './HomePage';
import './i18n';
import LanguageCreation from './modules/languages/create/LanguageCreation';
import LanguageEdit from './modules/languages/edit/LanguageEdit';
import LanguageList from './modules/languages/list/LanguageList';
import LanguageView from './modules/languages/view/LanguageView';
import ManeuversView from './modules/maneuvers/ManeuversView';
import RaceCreation from './modules/races/create/RaceCreation';
import RaceEdit from './modules/races/edit/RaceEdit';
import RaceList from './modules/races/list/RaceList';
import RaceView from './modules/races/view/RaceView';
import RealmCreation from './modules/realms/create/RealmCreation';
import RealmEdit from './modules/realms/edit/RealmEdit';
import RealmList from './modules/realms/list/RealmList';
import RealmView from './modules/realms/view/RealmView';
import SkillCategoryList from './modules/skills-categories/list/SkillCategoryList';
import SkillCategoryView from './modules/skills-categories/view/SkillCategoryView';
import SkillCreation from './modules/skills/create/SkillCreation';
import SkillList from './modules/skills/list/SkillList';
import SkillView from './modules/skills/view/SkillView';
import TraitCreation from './modules/traits/create/TraitCreation';
import TraitEdit from './modules/traits/edit/TraitEdit';
import TraitList from './modules/traits/list/TraitList';
import TraitView from './modules/traits/view/TraitView';

const App = () => {
  return (
    <ErrorProvider>
      <Box padding={2}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/realms" element={<RealmList />} />
          <Route path="/realms/create" element={<RealmCreation />} />
          <Route path="/realms/view/:realmId" element={<RealmView />} />
          <Route path="/realms/edit/:realmId" element={<RealmEdit />} />
          <Route path="/races" element={<RaceList />} />
          <Route path="/races/create" element={<RaceCreation />} />
          <Route path="/races/view/:raceId" element={<RaceView />} />
          <Route path="/races/edit/:raceId" element={<RaceEdit />} />
          <Route path="/traits" element={<TraitList />} />
          <Route path="/traits/view/:traitId" element={<TraitView />} />
          <Route path="/traits/create" element={<TraitCreation />} />
          <Route path="/traits/edit/:traitId" element={<TraitEdit />} />
          <Route path="/languages" element={<LanguageList />} />
          <Route path="/languages/create" element={<LanguageCreation />} />
          <Route path="/languages/view/:languageId" element={<LanguageView />} />
          <Route path="/languages/edit/:languageId" element={<LanguageEdit />} />
          <Route path="/maneuvers" element={<ManeuversView />} />
          <Route path="/skills" element={<SkillList />} />
          <Route path="/skills/view/:skillId" element={<SkillView />} />
          <Route path="/skills/create" element={<SkillCreation />} />
          <Route path="/skill-categories" element={<SkillCategoryList />} />
          <Route path="/skill-categories/view/:skillCategoryId" element={<SkillCategoryView />} />
        </Routes>
      </Box>
    </ErrorProvider>
  );
};

export default App;
