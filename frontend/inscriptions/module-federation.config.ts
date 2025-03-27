export const mfConfig = {
  
  name: "inscriptions",
  exposes: {
    "./CreateInscriptionForm" : "./src/CreateInscriptionForm/index.tsx",
    "./InscriptionCard": "./src/InscriptionCard/index.tsx",
    "./InscriptionsList" : "./src/InscriptionsList/index.tsx"
  },
  shared:{

    react: { singleton: true, requiredVersion: "^18.2.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
    "@mui/material": { singleton: true, requiredVersion: "^5.13.7" },
    axios: { singleton: true, requiredVersion: "^1.4.0" },
    typescript: { singleton: true, requiredVersion: "^5.7.3" },
    "react-router-dom": { singleton: true, requiredVersion:"^7.4.0"}
  }


};
