import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AppStateContextProvider } from "./contexts/AppStateContext.tsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    YsabeauInfant: `YsabeauInfant, sans-serif`,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AppStateContextProvider>
        <App />
      </AppStateContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
