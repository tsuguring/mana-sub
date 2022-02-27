import React from "react";
import { StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { COLOR } from "../../constants/theme";

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: COLOR.WHITE,
  },
});

interface Props {
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  label?: string;
  color?: string;
  icon?: string;
}

export default function Button(props: Props) {
  const {
    onPress,
    style,
    textStyle,
    label,
    color = COLOR.PRIMARY,
    icon,
  } = props;

  return (
    <PaperButton
      mode="contained"
      onPress={onPress}
      style={style}
      contentStyle={{
        backgroundColor: color,
      }}
      icon={icon}
    >
      {label && <Text style={[styles.text, textStyle]}>{label}</Text>}
    </PaperButton>
  );
}
