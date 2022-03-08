import React from "react";
import * as UiContext from "./src/contexts/ui";
import Routes from "./src/routes";
import { getApps, initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { firebaseConfig } from "./env";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

require("firebase/firestore");

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
  initializeAuth(initializeApp(firebaseConfig), {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export default function App() {
  const [applicationState, setApplicationState] = React.useState(
    UiContext.createApplicationInitialState()
  );
  return (
    <UiContext.Context.Provider
      value={{ applicationState, setApplicationState }}
    >
      <Routes />
    </UiContext.Context.Provider>
  );
}
