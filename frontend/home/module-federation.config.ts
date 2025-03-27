export const mfConfig = {
  name: "home",
  exposes: {},
  remotes: {
    users: 'users@http://localhost:3005/mf-manifest.json',
    inscriptions: 'inscriptions@http://localhost:3007/mf-manifest.json',
    courses: 'courses@http://localhost:3006/mf-manifest.json'
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.2.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
    "@mui/material": { singleton: true, requiredVersion: "^5.13.7" },
    axios: { singleton: true, requiredVersion: "^1.4.0" },
    typescript: { singleton: true, requiredVersion: "^5.7.3" },
    "react-router-dom": { singleton: true, requiredVersion:"^7.4.0"}
  }
};
