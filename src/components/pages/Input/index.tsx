// import * as React from "react";
// import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
// import IconButton from "../../atoms/IconButton";
// import { Alert } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { TextField, Button, dismiss } from "../../atoms";
// import { COLOR } from "../../../constants/theme";
// import { useControlledComponent } from "../../../lib/hooks";
// import firebase from "firebase";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import RNPickerSelect from "react-native-picker-select";
// import { useState } from "react";
// import { LinearGradient } from "expo-linear-gradient";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: "center",
//   },
//   text: {
//     marginBottom: 16,
//   },
//   button: {
//     marginTop: 20,
//   },
//   iconButton: {
//     position: "absolute",
//     top: 0,
//     right: 0,
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
// });

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: "#789",
//     borderRadius: 4,
//     color: "#789",
//     paddingRight: 30, // to ensure the text is never behind the icon
//     width: 300,
//     marginLeft: 30,
//   },
//   inputAndroid: {
//     fontSize: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderWidth: 0.5,
//     borderColor: "#789",
//     borderRadius: 8,
//     color: "black",
//     paddingRight: 30, // to ensure the text is never behind the icon
//     width: 280,
//     marginLeft: 30,
//     backgroundColor: "#eee",
//   },
// });

// export default function Input() {
//   const [date, setDate] = useState(new Date(Date.now()));
//   const [dateopen, setDateopen] = useState(false);
//   const showDatePicker = () => {
//     setDateopen(true);
//   };
//   const hideDatePicker = () => {
//     setDateopen(false);
//   };
//   const handleConfirm = () => {
//     hideDatePicker();
//   };
//   const onChangeDate = (selectedDate: Date) => {
//     const currentDate = selectedDate || date;
//     setDate(currentDate);
//   };

//   const [period, setPeriod] = React.useState("");
//   const onChangeperiod = (selectedperiod: string) => {
//     setPeriod(selectedperiod);
//   };

//   const title = useControlledComponent("");
//   const money = useControlledComponent("");
//   const detail = useControlledComponent("");

//   const { goBack } = useNavigation();
//   const back = React.useCallback(() => {
//     goBack();
//   }, [goBack]);

//   const addSubscription = React.useCallback(() => {
//     const db = firebase.firestore();
//     const { currentUser } = firebase.auth();
//     const ref = db.collection(`users/${currentUser?.uid}/subscriptions`);
//     ref
//       .add({
//         title: title.value,
//         money: money.value,
//         period: period,
//         date: date.toLocaleDateString(),
//         detail: detail.value,
//       })
//       .then(() => {
//         back();
//       })
//       .catch(() => {
//         Alert.alert("データの読み込みに失敗しました。");
//       });
//     title.onChangeData("");
//     money.onChangeData("");
//     setDate(new Date(Date.now()));
//     detail.onChangeData("");
//   }, [back, title, money, period, date, detail]);

//   const showdate: string = `${date.getFullYear()}年 ${
//     date.getMonth() + 1
//   }月 ${date.getDate()} 日`;

//   return (
//     <LinearGradient
//       colors={[COLOR.MAIN_DARK, COLOR.MAIN_LIGHT]}
//       style={styles.container}
//     >
//       <TouchableWithoutFeedback onPress={dismiss}>
//         <View style={styles.container}>
//           <IconButton
//             icon="close"
//             size={30}
//             iconColor={COLOR.PRIMARY}
//             onPress={back}
//             style={styles.iconButton}
//           />
//           <TextField
//             label="Title"
//             value={title.value}
//             onChangeText={title.onChangeData}
//             style={styles.text}
//           />
//           <TextField
//             label="Money"
//             value={money.value}
//             onChangeText={money.onChangeData}
//             style={styles.text}
//             keyboard="numeric"
//           />
//           <RNPickerSelect
//             onValueChange={onChangeperiod}
//             placeholder={{
//               label: "支払い期間",
//               value: null,
//             }}
//             items={[
//               { label: "1ヶ月", value: "1" },
//               { label: "2ヶ月", value: "2" },
//               { label: "3ヶ月", value: "3" },
//               { label: "6ヶ月", value: "6" },
//               { label: "12ヶ月", value: "12" },
//             ]}
//             style={pickerSelectStyles}
//           />
//           <View>
//             <Button onPress={showDatePicker} label={showdate}></Button>
//             <DateTimePickerModal
//               isVisible={dateopen}
//               mode="date"
//               date={date}
//               onConfirm={handleConfirm}
//               onCancel={hideDatePicker}
//               onChange={onChangeDate}
//               confirmTextIOS="完了"
//               cancelTextIOS="キャンセル"
//             />
//           </View>
//           <TextField
//             label="Detail"
//             value={detail.value}
//             onChangeText={detail.onChangeData}
//             style={styles.text}
//           />
//           <Button
//             onPress={addSubscription}
//             label="追加"
//             style={styles.button}
//             disabled={!title.value}
//           />
//         </View>
//       </TouchableWithoutFeedback>
//     </LinearGradient>
//   );
// }

import * as React from "react";
import { useState } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "../../../constants/theme";
import IconButton from "../../atoms/IconButton";
import Button from "../../atoms/Button";
import firebase from "firebase";

// フォームの値を定義
type FormData = {
  title: string;
  money: string;
  period: string;
  date: Date;
  detail?: string;
};

export default function Input() {
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { goBack } = useNavigation();
  const back = React.useCallback(() => {
    goBack();
  }, [goBack]);

  const onSubmit = (data: FormData) => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    const ref = db.collection(`users/${currentUser?.uid}/subscriptions`);
    ref
      .add({
        title: data.title,
        money: data.money,
        period: data.period,
        date: data.date.toLocaleDateString(),
        detail: data.detail,
      })
      .then(() => {
        back();
      })
      .catch(() => {
        Alert.alert("データの読み込みに失敗しました。");
      });
  };

  return (
    <LinearGradient
      colors={[COLOR.MAIN_DARK, COLOR.MAIN_LIGHT]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <IconButton
        icon="close"
        size={30}
        iconColor={COLOR.PRIMARY}
        onPress={back}
        style={styles.iconButton}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 0.2, alignItems: "flex-end" }}>
          <Text>タイトル</Text>
        </View>
        <View style={{ flex: 0.8 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.form}
                placeholder="Netflix"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="title"
            rules={{
              required: true,
              maxLength: 13,
            }}
            defaultValue=""
          />
          {errors.title && errors.title.type === "required" && (
            <Text style={{ color: "red" }}>タイトルは必須です。</Text>
          )}
          {errors.title && errors.title.type === "maxLength" && (
            <Text style={{ color: "red" }}>
              タイトルは10文字以内で入力してください。
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 0.2, alignItems: "flex-end" }}>
          <Text>金額</Text>
        </View>
        <View style={{ flex: 0.8 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.form}
                placeholder="980"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="money"
            rules={{
              required: true,
              maxLength: 7,
              pattern: /^[0-9]+$/,
            }}
            defaultValue=""
          />
          {errors.money && errors.money.type === "required" && (
            <Text style={{ color: "red" }}>金額は必須です。</Text>
          )}
          {errors.title && errors.title.type === "maxLength" && (
            <Text style={{ color: "red" }}>
              金額は7桁以内で入力してください。
            </Text>
          )}
          {errors.money && errors.money.type === "pattern" && (
            <Text style={{ color: "red" }}>
              全て半角数字を入力してください。
            </Text>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 0.2, alignItems: "flex-end" }}>
          <Text>支払い周期</Text>
        </View>
        <View style={{ flex: 0.8 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <RNPickerSelect
                onValueChange={(value) => onChange(value)}
                placeholder={{
                  label: "?ヶ月",
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
            )}
            name="period"
            rules={{
              required: true,
            }}
            defaultValue=""
          />
          {errors.period && errors.period.type === "required" && (
            <Text style={{ color: "red" }}>支払い周期は必須です。</Text>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 0.2, alignItems: "flex-end" }}>
          <Text>次回支払日</Text>
        </View>
        <View style={{ flex: 0.8 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TouchableOpacity
                  onPress={showDatePicker}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                    width: "80%",
                    flexDirection: "row",
                    margin: "4%",
                  }}
                >
                  <Text style={{ fontSize: 20 }}>
                    {value.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  date={value}
                  locale="ja-JP"
                  isVisible={dateopen}
                  onChange={onChange}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  confirmTextIOS="完了"
                  cancelTextIOS="キャンセル"
                />
              </>
            )}
            name="date"
            rules={{
              required: true,
            }}
            defaultValue={new Date(Date.now())}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 0.2, alignItems: "flex-end" }}>
          <Text>メモ</Text>
        </View>
        <View style={{ flex: 0.8 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.form}
                placeholder="無料体験中"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="detail"
            defaultValue=""
          />
        </View>
      </View>
      <Button label="追加" onPress={handleSubmit(onSubmit)} />
    </LinearGradient>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "80%",
    fontSize: 20,
    margin: "4%",
  },
  inputAndroid: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "80%",
    fontSize: 20,
    margin: "4%",
  },
});

const styles = StyleSheet.create({
  form: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "80%",
    fontSize: 20,
    margin: "4%",
  },
  iconButton: {
    position: "absolute",
    top: 20,
    right: 10,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
