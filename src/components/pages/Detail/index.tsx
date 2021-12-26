import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
  Alert,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Button, TextField } from "../../atoms";
import { useControlledComponent } from "../../../lib/hooks";
import DateTimePicker from "@react-native-community/datetimepicker";
import firebase from "firebase";

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
  date: string;
  detail: string;
}

export default function Detail() {
  const { params } = useRoute<RouteProp<Record<string, Params>, string>>();
  const {
    id: idInitialValue,
    title: titleInitialValue,
    money: moneyInitialValue,
    period: periodInitialValue,
    date: dateInitialValue,
    detail: detailInitialValue,
  } = params;

  const title = useControlledComponent(titleInitialValue);
  const money = useControlledComponent(moneyInitialValue);
  const period = useControlledComponent(periodInitialValue);
  const detail = useControlledComponent(detailInitialValue);

  const [date, setDate] = useState(new Date(dateInitialValue));
  const [show, setShow] = useState(false);
  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (Platform.OS === "android") {
      setShow(false);
    }
  };
  const showDatepicker = () => {
    setShow(!show);
  };

  const { goBack } = useNavigation();
  const back = React.useCallback(() => {
    goBack();
  }, [goBack]);

  const onSubmit = React.useCallback(() => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db
        .collection(`users/${currentUser?.uid}/subscriptions`)
        .doc(idInitialValue);
      ref
        .set(
          {
            title: title.value,
            money: money.value,
            period: period.value,
            date: date.toLocaleString(),
            detail: detail.value,
          },
          { merge: true }
        )
        .then(() => {
          back();
        })
        .catch(() => {
          Alert.alert("データの読み込みに失敗しました。");
        });
    }
  }, [back, title, money, period, date, detail]);

  return (
    <View style={styles.container}>
      <TextField
        label="title"
        value={title.value}
        onChangeText={title.onChangeData}
        style={styles.textField}
      />
      <TextField
        label="money"
        value={money.value}
        onChangeText={money.onChangeData}
        style={styles.textField}
      />
      <TextField
        label="period"
        value={period.value}
        onChangeText={period.onChangeData}
        style={styles.textField}
      />
      <View>
        <TouchableOpacity onPress={showDatepicker}>
          <Text>
            {date.getFullYear()}年 {date.getMonth() + 1}月 {date.getDate()}日
          </Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={true}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangeDate}
          />
        )}
      </View>
      <TextField
        label="detail"
        value={detail.value}
        onChangeText={detail.onChangeData}
        style={styles.textField}
      />
      <Button onPress={onSubmit} label="Submit" style={styles.button} />
    </View>
  );
}
