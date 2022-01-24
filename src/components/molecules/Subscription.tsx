import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { COLOR } from "../../constants/theme";
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
  titleContainer: {
    marginTop: 6,
    marginBottom: 6,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
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
  const { onPress, title, money, period, date } = props;
  const nowdate = new Date(Date.now());
  const today = +new Date(nowdate.toLocaleDateString());
  const nextpayment = +new Date(date);
  const untilpayment = (nextpayment - today) / 86400000;

  return (
    <TouchableOpacity onPress={onPress} style={styles.contentContainer}>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {untilpayment < 5 ? (
          <Text style={styles.redperiod}>支払いまであと{untilpayment}日</Text>
        ) : (
          <Text style={styles.period}>支払いまであと{untilpayment}日</Text>
        )}
      </View>
      <Text style={styles.money}>
        ¥{Math.trunc(Number(money) / Number(period)).toLocaleString()}円/月
      </Text>
    </TouchableOpacity>
  );
}
