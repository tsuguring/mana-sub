import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLOR } from "../../constants/theme";

const styles = StyleSheet.create({
  contentContainer: {
    borderRadius: 7,
    backgroundColor: COLOR.WHITE,
    borderLeftWidth: 10,
    borderLeftColor: COLOR.MAIN,
    borderWidth: 1,
    borderColor: COLOR.GRAY_LIGHT,
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
    fontSize: 16,
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
  changemoney: boolean;
}

export default function SubscriptionDisplay(props: Props) {
  const { onPress, title, money, period, date, changemoney } = props;
  const nowdate = new Date(Date.now());
  const today = +new Date(nowdate.toLocaleDateString());
  const nextpayment = +new Date(date);
  const untillpayment = (nextpayment - today) / 86400000;

  if (untillpayment <= 5) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.contentContainer}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          {untillpayment === 0 ? (
            <Text style={styles.redperiod}>支払い当日</Text>
          ) : (
            <Text style={styles.redperiod}>
              支払いまであと{untillpayment}日
            </Text>
          )}
        </View>
        {changemoney ? (
          <Text style={styles.money}>
            ¥
            {Math.trunc(Number(money) * (12 / Number(period))).toLocaleString()}
            円/年
          </Text>
        ) : (
          <Text style={styles.money}>
            ¥{Math.trunc(Number(money) / Number(period)).toLocaleString()}
            円/月
          </Text>
        )}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={styles.contentContainer}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <Text style={styles.period}>支払いまであと{untillpayment}日</Text>
        </View>
        {changemoney ? (
          <Text style={styles.money}>
            ¥
            {Math.trunc(Number(money) * (12 / Number(period))).toLocaleString()}
            円/年
          </Text>
        ) : (
          <Text style={styles.money}>
            ¥{Math.trunc(Number(money) / Number(period)).toLocaleString()}
            円/月
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}
