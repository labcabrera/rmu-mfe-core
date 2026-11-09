import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MfeRoot, NotFound } from '@labcabrera-rmu/rmu-react-shared-lib';

// Workspace spec 091, E1: every page is its own chunk; the Suspense is in MfeRoot / the shell layout.
const HomePage = lazy(() => import('./HomePage'));
const AttackTablesHome = lazy(() => import('./modules/attack-tables/AttackTablesHome'));
const AttackTablesView = lazy(() => import('./modules/attack-tables/attack/AttackTablesView'));
const CriticalTablesView = lazy(() => import('./modules/attack-tables/critical/CriticalTablesView'));
const FumbleTablesView = lazy(() => import('./modules/attack-tables/fumble/FumbleTablesView'));
const CatalogListPage = lazy(() => import('./modules/catalogs/list/CatalogListPage'));
const CatalogViewPage = lazy(() => import('./modules/catalogs/view/CatalogViewPage'));
const CultureFormPage = lazy(() => import('./modules/cultures/form/CultureFormPage'));
const CultureListPage = lazy(() => import('./modules/cultures/list/CultureListPage'));
const CultureViewPage = lazy(() => import('./modules/cultures/view/CultureViewPage'));
const EffectTypeFormPage = lazy(() => import('./modules/effect-types/form/EffectTypeFormPage'));
const EffectTypeListPage = lazy(() => import('./modules/effect-types/list/EffectTypeListPage'));
const EffectTypeViewPage = lazy(() => import('./modules/effect-types/view/EffectTypeViewPage'));
const FightingStylesView = lazy(() => import('./modules/fighting-styles/FightingStylesView'));
const StyleAbilityView = lazy(() => import('./modules/fighting-styles/StyleAbilityView'));
const ManeuversView = lazy(() => import('./modules/maneuvers/ManeuversView'));
const ProfessionFormPage = lazy(() => import('./modules/professions/form/ProfessionFormPage'));
const ProfessionListPage = lazy(() => import('./modules/professions/list/ProfessionListPage'));
const ProfessionViewPage = lazy(() => import('./modules/professions/view/ProfessionViewPage'));
const RaceFormPage = lazy(() => import('./modules/races/form/RaceFormPage'));
const RaceListPage = lazy(() => import('./modules/races/list/RaceListPage'));
const RaceViewPage = lazy(() => import('./modules/races/view/RaceViewPage'));
const RealmFormPage = lazy(() => import('./modules/realms/form/RealmFormPage'));
const RealmListPage = lazy(() => import('./modules/realms/list/RealmListPage'));
const RealmViewPage = lazy(() => import('./modules/realms/view/RealmViewPage'));
const ResistanceRollView = lazy(() => import('./modules/resistance-rolls/ResistanceRollView'));
const SkillCategoryListPage = lazy(() => import('./modules/skills-categories/list/SkillCategoryListPage'));
const SkillCategoryViewPage = lazy(() => import('./modules/skills-categories/view/SkillCategoryViewPage'));
const SkillFormPage = lazy(() => import('./modules/skills/form/SkillFormPage'));
const SkillListPage = lazy(() => import('./modules/skills/list/SkillListPage'));
const SkillViewPage = lazy(() => import('./modules/skills/view/SkillViewPage'));
const TraitFormPage = lazy(() => import('./modules/traits/form/TraitFormPage'));
const TraitListPage = lazy(() => import('./modules/traits/list/TraitListPage'));
const TraitViewPage = lazy(() => import('./modules/traits/view/TraitViewPage'));

const App = () => {
  return (
    <MfeRoot sx={{ p: 2, minHeight: '600pt' }} namespace="core">
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
        <Route path="/fighting-styles" element={<FightingStylesView />} />
        <Route path="/fighting-styles/abilities/:abilityId" element={<StyleAbilityView />} />
        <Route path="/maneuvers" element={<ManeuversView />} />
        <Route path="/resistance-rolls" element={<ResistanceRollView />} />
        <Route path="/attack-tables" element={<AttackTablesHome />} />
        <Route path="/attack-tables/attack" element={<AttackTablesView />} />
        <Route path="/attack-tables/critical" element={<CriticalTablesView />} />
        <Route path="/attack-tables/fumble" element={<FumbleTablesView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MfeRoot>
  );
};

export default App;
