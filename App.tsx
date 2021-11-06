import React from "react";
import * as UiContext from "./src/contexts/ui";
import { StyleSheet, Text, View } from "react-native";
import Routes from "./src/routes";
import firebase from "firebase";
import { firebaseConfig } from "./env";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

firebase.auth().onAuthStateChanged(async (user) => {
  if (!user) {
    firebase.auth().signInAnonymously();
  } else {
    // TODO: ログインしているときにやる処理...
    console.log(user);
  }
});

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
