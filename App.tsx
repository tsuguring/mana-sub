import React from "react";
import * as UiContext from "./src/contexts/ui";
import { StyleSheet, Text, View } from "react-native";
import Routes from "./src/routes";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBkKvlpH5GlYUOSCHJ5suyzJUC3FlJT6bU",
  authDomain: "mana-sub.firebaseapp.com",
  projectId: "mana-sub",
  storageBucket: "mana-sub.appspot.com",
  messagingSenderId: "1051846455159",
  appId: "1:1051846455159:web:a7cd151cb249080e17fb72",
  measurementId: "G-7LC0CNB2E7",
};

if (firebase.app.length === 0) {
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
