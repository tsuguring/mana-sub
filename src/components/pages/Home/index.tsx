import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Subscriptions, { Subscription } from "../../organisms/Subscriptions";
import { COLOR } from "../../../constants/theme";
import { DETAIL, INPUT } from "../../../constants/path";
import Sumsubscription from "../../molecules/SumSubscription";
import firebase from "firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.MAIN_DARK,
  },
  button: {
    position: "absolute",
    bottom: 32,
    right: 32,
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
});

const subscribes = [
  {
    id: "1",
    title: "Netflix",
    money: "500",
    period: "1month",
    detail: "test",
    date: new Date(Date.now()),
  },
  {
    id: "2",
    title: "AppleMusic",
    money: "300",
    period: "6month",
    detail: "test",
    date: new Date(Date.now()),
  },
  {
    id: "3",
    title: "AmazonPrime",
    money: "300",
    period: "1month",
    detail: "test",
    date: new Date(Date.now()),
  },
  {
    id: "4",
    title: "AmazonPrime",
    money: "300",
    period: "1month",
    detail: "test",
    date: new Date(Date.now()),
  },
  {
    id: "5",
    title: "AmazonPrime",
    money: "300",
    period: "1month",
    detail: "test",
    date: new Date(Date.now()),
  },
  {
    id: "6",
    title: "AmazonPrime",
    money: "300",
    period: "1month",
    detail: "test",
    date: new Date(Date.now()),
  },
  {
    id: "7",
    title: "AmazonPrime",
    money: "300",
    period: "1month",
    detail: "test",
    date: new Date(Date.now()),
  },
];

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
  const { navigate } = useNavigation();
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
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      const ref = db.collection(`users/${currentUser.uid}/subscriptions`);
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const userSubscriptions: React.SetStateAction<State[]> = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            userSubscriptions.push({
              id: doc.id,
              title: data.title,
              money: data.money,
              period: data.period,
              date: data.date,
              detail: data.detail,
            });
          });
          setSubscriptions(userSubscriptions);
        },
        () => {
          Alert.alert("データの読み込みに失敗しました。");
        }
      );
    }
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Sumsubscription />
      <Subscriptions subscriptions={subscripitons} actions={{ gotoDetail }} />
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Icon color={COLOR.BLACK} size={24} name="plus" />
      </TouchableOpacity>
    </View>
  );
}
