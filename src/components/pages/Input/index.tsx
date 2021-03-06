import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import { COLOR } from "../../../constants/theme";
import { Button } from "../../atoms";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Notifications from "expo-notifications";

// フォームの値を定義
type FormData = {
  title: string;
  money: string;
  period: string;
  date: Date;
  detail?: string;
  notificationId?: string;
};

export default function Input() {
  const [dateopen, setDateopen] = useState(false);
  const [permissionCheck, setPermissionCheck] = useState(false);
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

  const onSubmit = async (data: FormData) => {
    if (permissionCheck) {
      if (data.period === "1") {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `${data.title}の支払い`,
            body: `三日後に${data.money}円支払われます`,
          },
          trigger: {
            repeats: true,
            day: data.date.getDate() - 3,
            hour: 9,
            minute: 0,
          },
        });
      } else {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `${data.title}の支払い`,
            body: `三日後に${data.money}円支払われます`,
          },
          trigger: {
            repeats: true,
            month: data.date.getMonth() + 1,
            day: data.date.getDate() - 3,
            hour: 9,
            minute: 0,
          },
        });
      }
      const notifications =
        await Notifications.getAllScheduledNotificationsAsync();
      const db = getFirestore();
      const user = getAuth().currentUser;
      const colref = collection(db, `users/${user?.uid}/subscriptions`);
      const adddata = {
        title: data.title,
        money: data.money,
        period: data.period,
        date: data.date.toLocaleDateString(),
        detail: data.detail,
        notificationId: notifications.slice(-1)[0].identifier,
      };
      addDoc(colref, adddata)
        .then(() => {
          back();
        })
        .catch(() => {
          Alert.alert("データの読み込みに失敗しました。");
        });
    } else {
      const db = getFirestore();
      const user = getAuth().currentUser;
      const colref = collection(db, `users/${user?.uid}/subscriptions`);
      const adddata = {
        title: data.title,
        money: data.money,
        period: data.period,
        date: data.date.toLocaleDateString(),
        detail: data.detail,
        notificationId: "none",
      };
      addDoc(colref, adddata)
        .then(() => {
          back();
        })
        .catch(() => {
          Alert.alert("データの読み込みに失敗しました。");
        });
    }
  };

  const permissionsAsync = async () => {
    await Notifications.getPermissionsAsync().then((data) => {
      setPermissionCheck(data.granted);
    });
  };

  React.useEffect(() => {
    permissionsAsync();
  }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.KeyboardScrollView}
      extraScrollHeight={20}
    >
      <View style={styles.formContainer}>
        <View style={styles.formTitleContainer}>
          <Text style={styles.title}>サービス名</Text>
        </View>
        <View>
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
            <Text style={{ color: "red" }}>サービス名は必須です。</Text>
          )}
          {errors.title && errors.title.type === "maxLength" && (
            <Text style={{ color: "red" }}>
              サービス名は12文字以内で入力してください。
            </Text>
          )}
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formTitleContainer}>
          <Text style={styles.title}>金額</Text>
        </View>
        <View>
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
      <View style={styles.formContainer}>
        <View style={styles.formTitleContainer}>
          <Text style={styles.title}>支払い周期</Text>
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <RNPickerSelect
                onValueChange={(value) => onChange(value)}
                placeholder={{}}
                items={[
                  { label: "1ヶ月", value: "1" },
                  { label: "1年", value: "12" },
                ]}
                doneText="完了"
                style={pickerSelectStyles}
              />
            )}
            name="period"
            rules={{
              required: true,
            }}
            defaultValue="1"
          />
          {errors.period && errors.period.type === "required" && (
            <Text style={{ color: "red" }}>支払い周期は必須です。</Text>
          )}
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formTitleContainer}>
          <Text style={styles.title}>次回支払日</Text>
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity onPress={showDatePicker} style={styles.form}>
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
      <View style={styles.formContainer}>
        <View style={styles.formTitleContainer}>
          <Text style={styles.title}>メモ</Text>
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                multiline
                style={styles.memoForm}
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
      <View style={styles.Button}>
        <Button label="追加" onPress={handleSubmit(onSubmit)} />
      </View>
    </KeyboardAwareScrollView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: COLOR.MAIN_DARK,
    borderRadius: 5,
    fontSize: 20,
    padding: 8,
    backgroundColor: COLOR.WHITE,
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: COLOR.MAIN_DARK,
    borderRadius: 5,
    fontSize: 20,
    padding: 8,
    backgroundColor: COLOR.WHITE,
  },
});

const styles = StyleSheet.create({
  KeyboardScrollView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "90%",
    flex: 0.15,
  },
  formTitleContainer: { paddingVertical: 7 },
  title: { color: COLOR.MAIN_DARK },
  form: {
    borderWidth: 1,
    borderColor: COLOR.MAIN_DARK,
    borderRadius: 5,
    fontSize: 20,
    padding: 8,
    backgroundColor: COLOR.WHITE,
  },
  memoForm: {
    borderWidth: 1,
    borderColor: COLOR.MAIN_DARK,
    borderRadius: 5,
    fontSize: 20,
    padding: 8,
    backgroundColor: COLOR.WHITE,
    height: "100%",
  },
  Button: {
    flex: 0.15,
    marginTop: 10,
    justifyContent: "flex-end",
    width: "90%",
  },
});
