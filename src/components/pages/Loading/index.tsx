import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { COLOR } from "../../../constants/theme";
import { Context as UiContext, Status } from "../../../contexts/ui";
import firebase from "firebase";
import { ActivityIndicator, Colors } from "react-native-paper";
import { isInitialLaunch } from "../../../lib/InitialLaunch/isInitialLaunch";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.MAIN,
  },
  text: {
    color: COLOR.WHITE,
  },
});

export default function Loading() {
  const { setApplicationState } = React.useContext(UiContext);
  async function navigateNextScreen() {
    firebase.auth().signInAnonymously();
    const isOpened = await isInitialLaunch();
    if (!isOpened) {
      setApplicationState(Status.FIRST_OPEN);
      return;
    }
    setApplicationState(Status.AUTHORIZED);
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        navigateNextScreen();
      } else {
        setApplicationState(Status.AUTHORIZED);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.blue500} />
    </View>
  );
}
