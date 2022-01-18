import * as React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import IconButton from "../../atoms/IconButton";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextField, Button, dismiss } from "../../atoms";
import { COLOR } from "../../../constants/theme";
import { useControlledComponent } from "../../../lib/hooks";
import firebase from "firebase";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#789",
    borderRadius: 4,
    color: "#789",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 300,
    marginLeft: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#789",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 280,
    marginLeft: 30,
    backgroundColor: "#eee",
  },
});

export default function Input() {
  const [date, setDate] = useState(new Date(Date.now()));
  const [dateopen, setDateopen] = useState(false);
  const showDatePicker = () => {
    setDateopen(true);
  };
  const hideDatePicker = () => {
    setDateopen(false);
  };
  const handleConfirm = () => {
    hideDatePicker();
  };
  const onChangeDate = (selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const [period, setPeriod] = React.useState("");
  const onChangeperiod = (selectedperiod: string) => {
    setPeriod(selectedperiod);
  };

  const title = useControlledComponent("");
  const money = useControlledComponent("");
  const detail = useControlledComponent("");

  const { goBack } = useNavigation();
  const back = React.useCallback(() => {
    goBack();
  }, [goBack]);

  const addSubscription = React.useCallback(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    const ref = db.collection(`users/${currentUser?.uid}/subscriptions`);
    ref
      .add({
        title: title.value,
        money: money.value,
        period: period,
        date: date.toLocaleDateString(),
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
    setDate(new Date(Date.now()));
    detail.onChangeData("");
  }, [back, title, money, period, date, detail]);

  const showdate: string = `${date.getFullYear()}年 ${
    date.getMonth() + 1
  }月 ${date.getDate()} 日`;

  return (
    <LinearGradient
      colors={[COLOR.MAIN_DARK, COLOR.MAIN_LIGHT]}
      style={styles.container}
    >
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
            keyboard="numeric"
          />
          <RNPickerSelect
            onValueChange={onChangeperiod}
            placeholder={{
              label: "支払い期間",
              value: null,
            }}
            items={[
              { label: "1ヶ月", value: "1" },
              { label: "2ヶ月", value: "2" },
              { label: "3ヶ月", value: "3" },
              { label: "6ヶ月", value: "6" },
              { label: "12ヶ月", value: "12" },
            ]}
            style={pickerSelectStyles}
          />
          <View>
            <Button onPress={showDatePicker} label={showdate}></Button>
            <DateTimePickerModal
              isVisible={dateopen}
              mode="date"
              date={date}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              onChange={onChangeDate}
              confirmTextIOS="完了"
              cancelTextIOS="キャンセル"
            />
          </View>
          <TextField
            label="Detail"
            value={detail.value}
            onChangeText={detail.onChangeData}
            style={styles.text}
          />
          <Button
            onPress={addSubscription}
            label="追加"
            style={styles.button}
            disabled={!title.value}
          />
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}
