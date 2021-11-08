import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Subscriptions, { Subscription } from "../../organisms/Subscriptions";
import { COLOR } from "../../../constants/theme";
import { DETAIL, INPUT } from "../../../constants/path";
import Sumsubscription from "../../molecules/SumSubscription";

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
  },
  {
    id: "2",
    title: "AppleMusic",
    money: "300",
    period: "6month",
    detail: "test",
  },
  {
    id: "3",
    title: "AmazonPrime",
    money: "300",
    period: "1month",
    detail: "test",
  },
  {
    id: "4",
    title: "AmazonPrime",
    money: "300",
    period: "1month",
    detail: "test",
  },
  {
    id: "5",
    title: "AmazonPrime",
    money: "300",
    period: "1month",
    detail: "test",
  },
  {
    id: "6",
    title: "AmazonPrime",
    money: "300",
    period: "1month",
    detail: "test",
  },
  {
    id: "7",
    title: "AmazonPrime",
    money: "300",
    period: "1month",
    detail: "test",
  },
];

export default function Home() {
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

  return (
    <View style={styles.container}>
      <Sumsubscription />
      <Subscriptions subscriptions={subscribes} actions={{ gotoDetail }} />
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Icon color={COLOR.BLACK} size={24} name="plus" />
      </TouchableOpacity>
    </View>
  );
}
