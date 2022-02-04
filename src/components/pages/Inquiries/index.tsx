import React from "react";
import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemcontainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    backgroundColor: COLOR.WHITE,
  },
});

export default function Inquiries() {
  return (
    <LinearGradient
      colors={[COLOR.MAIN, COLOR.MAIN, COLOR.WHITE]}
      style={styles.container}
    >
      <Text>Inquiries</Text>
    </LinearGradient>
  );
}
