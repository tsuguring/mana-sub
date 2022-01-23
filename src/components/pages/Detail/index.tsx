import * as React from "react";
import { useState } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
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
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db
        .collection(`users/${currentUser?.uid}/subscriptions`)
        .doc(idInitialValue);
      ref
        .set(
          {
            title: data.title,
            money: data.money,
            period: data.period,
            date: data.date.toLocaleString(),
            detail: data.detail,
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
  };

  return (
    <LinearGradient
      colors={[COLOR.MAIN_DARK, COLOR.MAIN_LIGHT]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
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
                value={titleInitialValue}
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
                placeholder="990"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={moneyInitialValue}
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
                value={periodInitialValue}
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
                  date={new Date(dateInitialValue)}
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
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={detailInitialValue}
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
