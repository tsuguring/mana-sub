import * as React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import IconButton from "../../atoms/IconButton";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextField, Button, dismiss } from "../../atoms";
import { COLOR } from "../../../constants/theme";
import { useControlledComponent } from "../../../lib/hooks";
import DatePicker from "../../atoms/DatePicker";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: COLOR.MAIN,
  },
  text: {
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
  },
  iconButton: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default function Input() {
  const title = useControlledComponent("");
  const money = useControlledComponent("");
  const period = useControlledComponent("");
  const detail = useControlledComponent("");

  const { goBack } = useNavigation();
  const back = React.useCallback(() => {
    goBack();
  }, [goBack]);

  const addTodo = React.useCallback(() => {
    back();
    title.onChangeText("");
    money.onChangeText("");
    period.onChangeText("");
    detail.onChangeText("");
  }, [back, title, money, period, detail]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismiss}>
        <View style={styles.container}>
          <IconButton
            icon="close"
            size={30}
            iconColor={COLOR.PRIMARY}
            onPress={back}
            style={styles.iconButton}
          />
          <TextField
            label="Title"
            value={title.value}
            onChangeText={title.onChangeText}
            style={styles.text}
          />
          <TextField
            label="Money"
            value={money.value}
            onChangeText={money.onChangeText}
            style={styles.text}
          />
          <TextField
            label="Period"
            value={period.value}
            onChangeText={period.onChangeText}
            style={styles.text}
          />
          <DatePicker date={new Date(Date.now())} />
          <TextField
            label="Detail"
            value={detail.value}
            onChangeText={detail.onChangeText}
            style={styles.text}
          />
          <Button
            onPress={addTodo}
            label="Add"
            style={styles.button}
            disabled={!title.value}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
