import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MfeRoot, NotFound } from '@labcabrera-rmu/rmu-react-shared-lib';
import HomePage from './HomePage';
import CatalogListPage from './modules/catalogs/list/CatalogListPage';
import CatalogViewPage from './modules/catalogs/view/CatalogViewPage';
import CultureFormPage from './modules/cultures/form/CultureFormPage';
import CultureListPage from './modules/cultures/list/CultureListPage';
import CultureViewPage from './modules/cultures/view/CultureViewPage';
import EffectTypeFormPage from './modules/effect-types/form/EffectTypeFormPage';
import EffectTypeListPage from './modules/effect-types/list/EffectTypeListPage';
import EffectTypeViewPage from './modules/effect-types/view/EffectTypeViewPage';
import ManeuversView from './modules/maneuvers/ManeuversView';
import ProfessionFormPage from './modules/professions/form/ProfessionFormPage';
import ProfessionListPage from './modules/professions/list/ProfessionListPage';
import ProfessionViewPage from './modules/professions/view/ProfessionViewPage';
import RaceFormPage from './modules/races/form/RaceFormPage';
import RaceListPage from './modules/races/list/RaceListPage';
import RaceViewPage from './modules/races/view/RaceViewPage';
import RealmFormPage from './modules/realms/form/RealmFormPage';
import RealmListPage from './modules/realms/list/RealmListPage';
import RealmViewPage from './modules/realms/view/RealmViewPage';
import ResistanceRollView from './modules/resistance-rolls/ResistanceRollView';
import SkillCategoryListPage from './modules/skills-categories/list/SkillCategoryListPage';
import SkillCategoryViewPage from './modules/skills-categories/view/SkillCategoryViewPage';
import SkillFormPage from './modules/skills/form/SkillFormPage';
import SkillListPage from './modules/skills/list/SkillListPage';
import SkillViewPage from './modules/skills/view/SkillViewPage';
import TraitFormPage from './modules/traits/form/TraitFormPage';
import TraitListPage from './modules/traits/list/TraitListPage';
import TraitViewPage from './modules/traits/view/TraitViewPage';

const App = () => {
  return (
    <MfeRoot sx={{ p: 2, minHeight: '600pt' }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/realms" element={<RealmListPage />} />
        <Route path="/realms/create" element={<RealmFormPage mode="create" />} />
        <Route path="/realms/view/:realmId" element={<RealmViewPage />} />
        <Route path="/realms/edit/:realmId" element={<RealmFormPage mode="edit" />} />
        <Route path="/races" element={<RaceListPage />} />
        <Route path="/races/create" element={<RaceFormPage mode="create" />} />
        <Route path="/races/view/:raceId" element={<RaceViewPage />} />
        <Route path="/races/edit/:raceId" element={<RaceFormPage mode="edit" />} />
        <Route path="/cultures" element={<CultureListPage />} />
        <Route path="/cultures/create" element={<CultureFormPage mode="create" />} />
        <Route path="/cultures/view/:cultureId" element={<CultureViewPage />} />
        <Route path="/cultures/edit/:cultureId" element={<CultureFormPage mode="edit" />} />
        <Route path="/professions" element={<ProfessionListPage />} />
        <Route path="/professions/create" element={<ProfessionFormPage mode="create" />} />
        <Route path="/professions/view/:professionId" element={<ProfessionViewPage />} />
        <Route path="/professions/edit/:professionId" element={<ProfessionFormPage mode="edit" />} />
        <Route path="/traits" element={<TraitListPage />} />
        <Route path="/traits/view/:traitId" element={<TraitViewPage />} />
        <Route path="/traits/create" element={<TraitFormPage mode="create" />} />
        <Route path="/traits/edit/:traitId" element={<TraitFormPage mode="edit" />} />
        <Route path="/effect-types" element={<EffectTypeListPage />} />
        <Route path="/effect-types/create" element={<EffectTypeFormPage mode="create" />} />
        <Route path="/effect-types/view/:effectTypeId" element={<EffectTypeViewPage />} />
        <Route path="/effect-types/edit/:effectTypeId" element={<EffectTypeFormPage mode="edit" />} />
        <Route path="/skills" element={<SkillListPage />} />
        <Route path="/skills/view/:skillId" element={<SkillViewPage />} />
        <Route path="/skills/edit/:skillId" element={<SkillFormPage mode="edit" />} />
        <Route path="/skills/create" element={<SkillFormPage mode="create" />} />
        <Route path="/skill-categories" element={<SkillCategoryListPage />} />
        <Route path="/skill-categories/view/:skillCategoryId" element={<SkillCategoryViewPage />} />
        <Route path="/catalogs" element={<CatalogListPage />} />
        <Route path="/catalogs/view/:category" element={<CatalogViewPage />} />
        <Route path="/maneuvers" element={<ManeuversView />} />
        <Route path="/resistance-rolls" element={<ResistanceRollView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MfeRoot>
  );
};

export default App;
