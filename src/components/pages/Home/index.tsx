import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Subscriptions, { Subscription } from "../../organisms/Subscriptions";
import { COLOR } from "../../../constants/theme";
import { DETAIL, INPUT } from "../../../constants/path";
import { Sumsubscription } from "../../molecules";
import firebase from "firebase";
import { Button } from "../../atoms";
import { LinearGradient } from "expo-linear-gradient";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconbutton: {
    position: "absolute",
    bottom: 16,
    right: 38,
    width: 48,
    height: 48,
    backgroundColor: COLOR.SECONDARY,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  button: {
    marginTop: 20,
  },
});

export interface State {
  id: string;
  title: string;
  money: string;
  period: string;
  date: string;
  detail?: string;
}

export default function Home() {
  const [subscripitons, setSubscriptions] = React.useState<State[]>([]);
  const [sumsubscription, setSumsubscription] = useState(0);
  const { navigate } = useNavigation<any>();
  const onPress = React.useCallback(() => {
    navigate(INPUT);
  }, [navigate]);
  const gotoDetail = React.useCallback(
    (state: Subscription.State) => {
      navigate(DETAIL, { ...state });
    },
    [navigate]
  );

  const plussubscription = (money: number[]) => {
    let sum = 0;
    for (let i in money) {
      sum += money[i];
    }
    setSumsubscription(sum);
  };

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      const ref = db.collection(`users/${currentUser.uid}/subscriptions`);
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const userSubscriptions: React.SetStateAction<State[]> = [];
          const sumSubscriptions: number[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();

            //支払日になると次回支払日が更新される
            const nowdate = new Date(Date.now());
            const today = +new Date(nowdate.toLocaleDateString());
            const nextpayment = +new Date(data.date);
            const untilpayment = (nextpayment - today) / 86400000;
            if (untilpayment <= 0) {
              data.date = new Date(data.date).setMonth(
                new Date(data.date).getMonth() + Number(data.period)
              );
            }

            userSubscriptions.push({
              id: doc.id,
              title: data.title,
              money: data.money,
              period: data.period,
              date: data.date,
              detail: data.detail,
            });
            sumSubscriptions.push(
              Math.trunc(Number(data.money) / Number(data.period))
            );
          });
          setSubscriptions(userSubscriptions);
          plussubscription(sumSubscriptions);
        },
        () => {
          Alert.alert("データの読み込みに失敗しました。");
        }
      );
    }
    return unsubscribe;
  }, []);

  if (subscripitons.length === 0) {
    return (
      <LinearGradient
        colors={[COLOR.MAIN, COLOR.MAIN, COLOR.WHITE]}
        style={styles.container}
      >
        <Text>契約しているサブスクリプションを追加しましょう!</Text>
        <Button onPress={onPress} label="追加" style={styles.button} />
      </LinearGradient>
    );
  } else {
    return (
      <LinearGradient
        colors={[COLOR.MAIN, COLOR.MAIN, COLOR.WHITE]}
        style={styles.container}
      >
        <Sumsubscription sumsubscriptions={sumsubscription} />
        <Subscriptions subscriptions={subscripitons} actions={{ gotoDetail }} />
        <TouchableOpacity onPress={onPress} style={styles.iconbutton}>
          <Icon color={COLOR.WHITE} size={20} name="plus" />
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}
