import React from "react";
import * as UiContext from "./src/contexts/ui";
import Routes from "./src/routes";
import firebase from "firebase";
import { firebaseConfig } from "./env";
import { NativeBaseProvider } from "native-base";

require("firebase/firestore");

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [applicationState, setApplicationState] = React.useState(
    UiContext.createApplicationInitialState()
  );
  return (
    <NativeBaseProvider>
      <UiContext.Context.Provider
        value={{ applicationState, setApplicationState }}
      >
        <Routes />
      </UiContext.Context.Provider>
    </NativeBaseProvider>
  );
}
