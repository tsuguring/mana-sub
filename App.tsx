import React from "react";
import * as UiContext from "./src/contexts/ui";
import { StyleSheet } from "react-native";
import Routes from "./src/routes";
import firebase from "firebase";
import { firebaseConfig } from "./env";

require("firebase/firestore");

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
