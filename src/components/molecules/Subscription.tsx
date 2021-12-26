import React from "react";
import { Text, TouchableHighlight, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { COLOR } from "../../constants/theme";

const styles = StyleSheet.create({
  conteiner: {
    padding: 10,
  },
  contentContainer: {
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
    fontSize: 32,
  },
  money: {
    fontSize: 16,
  },
});

interface Props {
  onPress: () => void;
  title: string;
  money: string;
  period: string;
  date: string;
  detail: string | undefined;
}

export default function SubscriptionDisplay(props: Props) {
  const { onPress, title, money } = props;

  return (
    <View>
      <TouchableHighlight onPress={onPress}>
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.money}>{money}円</Text>
          </View>
          <Icon name="delete" size={20} color={COLOR.BLACK} />
        </View>
      </TouchableHighlight>
    </View>
  );
}
