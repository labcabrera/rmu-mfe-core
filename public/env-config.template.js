// Runtime configuration, read through window.__RMU_CONFIG__ (see webpack.config.ts).
// The Docker image renders this file into env-config.js with envsubst (docker/40-env-config.sh);
// the webpack dev server serves the same keys from .env. Only public values belong here.
// When core runs inside the shell, the shell's env-config.js is the one in effect.
window.__RMU_CONFIG__ = {
  RMU_MFE_ASSETS: '${RMU_MFE_ASSETS}',
  RMU_API_CORE_URL: '${RMU_API_CORE_URL}',
  // Read by rmu-react-shared-lib.
  RMU_API_STRATEGIC_URL: '${RMU_API_STRATEGIC_URL}',
  RMU_API_TACTICAL_URL: '${RMU_API_TACTICAL_URL}',
  RMU_API_ITEMS_URL: '${RMU_API_ITEMS_URL}',
  RMU_API_ATTACK_TABLES_URL: '${RMU_API_ATTACK_TABLES_URL}',
  RMU_API_NPCS_URL: '${RMU_API_NPCS_URL}',
  RMU_API_SPELLS_URL: '${RMU_API_SPELLS_URL}',
  RMU_API_MEDIA_URL: '${RMU_API_MEDIA_URL}',
};
