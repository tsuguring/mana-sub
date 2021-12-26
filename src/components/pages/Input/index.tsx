import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import IconButton from "../../atoms/IconButton";
import { SafeAreaView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextField, Button, dismiss } from "../../atoms";
import { COLOR } from "../../../constants/theme";
import { useControlledComponent } from "../../../lib/hooks";
import firebase from "firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

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
  const [date, setDate] = useState(new Date(Date.now()));
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

  const title = useControlledComponent("");
  const money = useControlledComponent("");
  const period = useControlledComponent("");
  const detail = useControlledComponent("");

  const { goBack } = useNavigation();
  const back = React.useCallback(() => {
    goBack();
  }, [goBack]);

  const addTodo = React.useCallback(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    const ref = db.collection(`users/${currentUser?.uid}/subscriptions`);
    ref
      .add({
        title: title.value,
        money: money.value,
        period: period.value,
        date: date.toLocaleString(),
        detail: detail.value,
      })
      .then(() => {
        back();
      })
      .catch(() => {
        Alert.alert("データの読み込みに失敗しました。");
      });
    title.onChangeData("");
    money.onChangeData("");
    period.onChangeData("");
    setDate(new Date(Date.now()));
    detail.onChangeData("");
  }, [back, title, money, period, date, detail]);

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
            onChangeText={title.onChangeData}
            style={styles.text}
          />
          <TextField
            label="Money"
            value={money.value}
            onChangeText={money.onChangeData}
            style={styles.text}
          />
          <TextField
            label="Period"
            value={period.value}
            onChangeText={period.onChangeData}
            style={styles.text}
          />
          <View>
            <TouchableOpacity onPress={showDatepicker}>
              <Text>
                {date.getFullYear()}年 {date.getMonth() + 1}月 {date.getDate()}
                日
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
            label="Detail"
            value={detail.value}
            onChangeText={detail.onChangeData}
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
