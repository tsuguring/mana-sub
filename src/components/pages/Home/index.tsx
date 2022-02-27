import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Alert, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Subscriptions, { Subscription } from "../../organisms/Subscriptions";
import { COLOR } from "../../../constants/theme";
import { DETAIL, INPUT } from "../../../constants/path";
import { Sumsubscription } from "../../molecules";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import { Admob } from "../../atoms";
import { View } from "native-base";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconbutton: {
    position: "absolute",
    bottom: 48,
    right: 48,
    width: 48,
    height: 48,
    backgroundColor: COLOR.PRIMARY,
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
  title: {
    fontSize: 18,
    fontWeight: "600",
    paddingTop: 10,
    textAlign: "center",
    paddingBottom: 15,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
  admob: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  zerocontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 60,
  },
  maincontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  //月額と年額の変更
  const [changemoney, setChangemoney] = useState(false);

  //並び替え
  const [sort, setSort] = useState("");

  //サブスクリプションの配列
  const [subscriptions, setSubscriptions] = React.useState<State[]>([]);

  //金額の合計
  const [sumsubscription, setSumsubscription] = useState(0);
  const plussubscription = (money: number[]) => {
    let sum = 0;
    for (let i in money) {
      sum += money[i];
    }
    setSumsubscription(sum);
  };

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

  useEffect(() => {
    const db = getFirestore();
    const { currentUser } = getAuth();
    let unsubscribe = () => {};
    if (currentUser) {
      const q = query(collection(db, `users/${currentUser.uid}/subscriptions`));
      unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const userSubscriptions: React.SetStateAction<State[]> = [];
          const sumSubscriptions: number[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();

            //支払日になると次回支払日が更新される
            const nowdate = new Date(Date.now());
            const today = +new Date(nowdate.toLocaleDateString());
            const nextpayment = +new Date(data.date);
            const untillpayment = (nextpayment - today) / 86400000;
            if (untillpayment < 0) {
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
            sumSubscriptions.push(Number(data.money) / Number(data.period));
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

  if (subscriptions.length === 0) {
    return (
      <LinearGradient
        colors={[COLOR.MAIN, COLOR.MAIN, COLOR.WHITE]}
        style={styles.container}
      >
        <View style={styles.zerocontainer}>
          <Image source={require("../../../../assets/home.png")} />
          <Text style={styles.title}>サブスクリプションを追加！</Text>
          <Text style={styles.text}>
            右下のボタンから契約しているサブスクリプションの情報を入力してください
          </Text>
          <TouchableOpacity onPress={onPress} style={styles.iconbutton}>
            <Icon color={COLOR.WHITE} size={20} name="plus" />
          </TouchableOpacity>
        </View>
        <Admob />
      </LinearGradient>
    );
  } else {
    return (
      <LinearGradient
        colors={[COLOR.MAIN, COLOR.MAIN, COLOR.WHITE]}
        style={styles.container}
      >
        <View style={styles.maincontainer}>
          <Sumsubscription
            sumsubscriptions={sumsubscription}
            changemoney={changemoney}
            setChangemoney={setChangemoney}
            setSort={setSort}
          />
          <Subscriptions
            subscriptions={subscriptions}
            actions={{ gotoDetail }}
            changemoney={changemoney}
            sort={sort}
          />
          <TouchableOpacity onPress={onPress} style={styles.iconbutton}>
            <Icon color={COLOR.WHITE} size={20} name="plus" />
          </TouchableOpacity>
        </View>
        <Admob />
      </LinearGradient>
    );
  }
}
