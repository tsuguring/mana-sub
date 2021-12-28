import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Subscriptions, { Subscription } from "../../organisms/Subscriptions";
import { COLOR } from "../../../constants/theme";
import { DETAIL, INPUT } from "../../../constants/path";
import Sumsubscription from "../../molecules/SumSubscription";
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

  if (subscripitons.length === 0) {
    return (
      <LinearGradient
        colors={[COLOR.MAIN_LIGHT, COLOR.MAIN_DARK]}
        style={styles.container}
      >
        <Text> Your Text Here </Text>
        <Text>契約したサブスクリプションを追加しましょう!</Text>
        <Button onPress={onPress} label="追加" style={styles.button} />
      </LinearGradient>
    );
  } else {
    return (
      <LinearGradient
        colors={[COLOR.MAIN_LIGHT, COLOR.MAIN_DARK]}
        style={styles.container}
      >
        <Sumsubscription />
        <Subscriptions subscriptions={subscripitons} actions={{ gotoDetail }} />
        <TouchableOpacity onPress={onPress} style={styles.iconbutton}>
          <Icon color={COLOR.WHITE} size={20} name="plus" />
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}
