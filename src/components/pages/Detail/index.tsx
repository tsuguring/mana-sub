import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Button, TextField } from "../../atoms";
import { useControlledComponent } from "../../../lib/hooks";
import { DatePicker } from "../../atoms";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textField: {
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
  },
});

interface Params {
  id: string;
  title: string;
  money: string;
  period: string;
  detail: string;
}

export default function Detail() {
  const { goBack } = useNavigation();
  const { params } = useRoute<RouteProp<Record<string, Params>, string>>();
  const {
    title: titleInitialValue,
    money: moneyInitialValue,
    period: periodInitialValue,
    detail: detailInitialValue,
  } = params;

  const title = useControlledComponent(titleInitialValue);
  const money = useControlledComponent(moneyInitialValue);
  const period = useControlledComponent(periodInitialValue);
  const detail = useControlledComponent(detailInitialValue);

  const onSubmit = React.useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <View style={styles.container}>
      <TextField
        label="title"
        value={title.value}
        onChangeText={title.onChangeText}
        style={styles.textField}
      />
      <TextField
        label="money"
        value={money.value}
        onChangeText={money.onChangeText}
        style={styles.textField}
      />
      <TextField
        label="period"
        value={period.value}
        onChangeText={period.onChangeText}
        style={styles.textField}
      />
      <TextField
        label="detail"
        value={detail.value}
        onChangeText={detail.onChangeText}
        style={styles.textField}
      />
      <Button onPress={onSubmit} label="Submit" style={styles.button} />
    </View>
  );
}
