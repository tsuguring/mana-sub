import React from "react";
import { Text, TouchableHighlight, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLOR } from "../../constants/theme";

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: COLOR.MAIN,
    height: 120,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    color: COLOR.WHITE,
  },
  money: {
    fontSize: 16,
    color: COLOR.WHITE,
  },
});

interface Props {
  onPress: () => void;
  title: string;
  money: string;
  period: string;
  date: Date;
  detail: string | undefined;
}

export default function SubscribeDisplay(props: Props) {
  const { onPress, title, money, period, date } = props;

  return (
    <View>
      <TouchableHighlight style={styles.contentContainer} onPress={onPress}>
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.money}>{money}円</Text>
            <Text style={styles.money}>{period}</Text>
            <Text style={styles.money}>
              {date.getFullYear()}/{date.getMonth()}/{date.getDate()}
            </Text>
          </View>
          <Icon name="angle-right" size={32} color={COLOR.WHITE} />
        </View>
      </TouchableHighlight>
    </View>
  );
}
