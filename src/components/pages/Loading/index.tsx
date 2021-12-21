import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLOR } from "../../../constants/theme";
import { Context as UiContext, Status } from "../../../contexts/ui";
import firebase from "firebase";
import { ActivityIndicator, Colors } from "react-native-paper";

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
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
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
