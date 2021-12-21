import React from "react";
import { Text, View, Button, Alert, StyleSheet } from "react-native";
import { COLOR } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.MAIN_LIGHT,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 30,
    marginBottom: 30,
  },
  text: {
    fontSize: 32,
  },
  button: {
    backgroundColor: COLOR.WHITE,
  },
});

interface Props {
  id: string;
  title: string;
  money: string;
  period: string;
  date: string;
  detail?: string;
}

export default function Sumsubscribe() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¥5,400</Text>
      <Button
        onPress={() => Alert.alert("まだ実装していません")}
        title="並び替え"
      />
    </View>
  );
}
