import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  Button as RButton,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "../../../constants/theme";
import Button from "../../atoms/Button";
import firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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

export default function Detail({ navigation }: { navigation: any }) {
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
  } = useForm<FormData>({
    defaultValues: {
      title: titleInitialValue,
      money: moneyInitialValue,
      period: periodInitialValue,
      date: new Date(dateInitialValue),
      detail: detailInitialValue,
    },
  });

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

  function deleteSubscription() {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const ref = db
        .collection(`users/${currentUser.uid}/subscriptions`)
        .doc(idInitialValue);
      Alert.alert("サブスクを削除します", "よろしいですか?", [
        {
          text: "キャンセル",
          onPress: () => {},
        },
        {
          text: "削除する",
          style: "destructive",
          onPress: () => {
            ref
              .delete()
              .then(() => {
                goBack();
              })
              .catch(() => {
                Alert.alert("削除に失敗しました");
              });
          },
        },
      ]);
    }
  }

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <RButton
            onPress={deleteSubscription}
            title="削除"
            color={COLOR.CAUTION}
          />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <LinearGradient
      colors={[COLOR.MAIN, COLOR.MAIN, COLOR.WHITE]}
      style={{ flex: 1 }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 0.13,
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
                maxLength: 12,
              }}
              defaultValue=""
            />
            {errors.title && errors.title.type === "required" && (
              <Text style={{ color: "red" }}>タイトルは必須です。</Text>
            )}
            {errors.title && errors.title.type === "maxLength" && (
              <Text style={{ color: "red" }}>
                タイトルは12文字以内で入力してください。
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            flex: 0.13,
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
                  keyboardType="number-pad"
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
            {errors.money && errors.money.type === "maxLength" && (
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
            flex: 0.13,
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
              render={({ field: { onChange, value } }) => (
                <RNPickerSelect
                  value={value}
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
                  doneText="完了"
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
            flex: 0.13,
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
              render={({ field: { onChange, value } }) => (
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
            flex: 0.15,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
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
                  multiline
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    width: "80%",
                    height: "100%",
                    fontSize: 20,
                    margin: "4%",
                  }}
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
        <View
          style={{ flex: 0.15, justifyContent: "center", alignItems: "center" }}
        >
          <Button label="追加" onPress={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAwareScrollView>
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
