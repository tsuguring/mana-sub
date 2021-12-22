import React, { useState } from "react";
import { View, Platform, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  date: Date;
  onChangeDate?: (dt: Date) => void;
}

export default function DatePicker(props: Props) {
  const [date, setDate] = useState(new Date(props.date));
  const [show, setShow] = useState(false);

  const onChangeDate = (selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
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
          onChange={onChangeDate}
        />
      )}
    </View>
  );
}
