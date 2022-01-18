import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Button from "../atoms/Button";
import { COLOR } from "../../constants/theme";

const padding = 40;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding,
    backgroundColor: COLOR.MAIN,
  },
  text: {
    lineHeight: 30,
    marginBottom: 40,
  },
});

export default function CarouselItem({
  item,
  index,
  onPress,
}: {
  item: { text: string };
  index: number;
  onPress: () => void;
}) {
  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/carousel_image1.png")} />
      <Text style={styles.text}>{item.text}</Text>
      {index === 2 ? <Button onPress={onPress} label="始める!" /> : <></>}
    </View>
  );
}
