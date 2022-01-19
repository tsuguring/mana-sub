import React, { useEffect } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { COLOR } from "../../constants/theme";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  contentContainer: {
    borderRadius: 7,
    backgroundColor: COLOR.WHITE,
    borderLeftWidth: 10,
    borderColor: COLOR.PRIMARY,
    height: 70,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 3,
    marginBottom: 1,
  },
  period: {
    fontSize: 14,
  },
  redperiod: {
    color: COLOR.CAUTION,
    fontSize: 14,
  },
  money: {
    fontSize: 17,
  },
});

interface Props {
  onPress: () => void;
  id: string;
  title: string;
  money: string;
  period: string;
  date: string;
  detail: string | undefined;
}

export default function SubscriptionDisplay(props: Props) {
  const { onPress, id, title, money, period, date } = props;
  const nowdate = new Date(Date.now());
  const today = +new Date(nowdate.toLocaleDateString());
  const nextpayment = +new Date(date);
  const untilpayment = (nextpayment - today) / 86400000;

  function deleteSubscription() {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const ref = db
        .collection(`users/${currentUser.uid}/subscriptions`)
        .doc(id);
      Alert.alert("サブスクを削除します", "よろしいですか?", [
        {
          text: "キャンセル",
          onPress: () => {},
        },
        {
          text: "削除する",
          style: "destructive",
          onPress: () => {
            ref.delete().catch(() => {
              Alert.alert("削除に失敗しました");
            });
          },
        },
      ]);
    }
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.contentContainer}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {untilpayment < 5 ? (
          <Text style={styles.redperiod}>支払いまであと{untilpayment}日</Text>
        ) : (
          <Text style={styles.period}>支払いまであと{untilpayment}日</Text>
        )}
      </View>
      <View>
        <Text style={styles.money}>
          ¥{Math.trunc(Number(money) / Number(period)).toLocaleString()}円/月
        </Text>
      </View>
      <TouchableOpacity onPress={deleteSubscription}>
        <Icon name="delete" size={22} color={COLOR.BLACK} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
