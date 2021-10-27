import React, { useState } from "react";
import { View, Button, StyleSheet, Platform, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 50,
  },
  pickedDateContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  pickedDate: {
    fontSize: 18,
    color: "black",
  },
  btnContainer: {
    padding: 30,
  },
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

interface Props {
  date: Date;
}

export default function DatePicker(props: Props) {
  const [date, setDate] = useState(new Date(props.date));
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    setDate(selectedDate);
    if (Platform.OS === "android") {
      setShow(false);
    }
  };

  const showDatepicker = () => {
    setShow(!show);
  };

  return (
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
          onChange={onChange}
        />
      )}
    </View>
  );
}
