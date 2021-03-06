import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Button from "../atoms/Button";

const padding = 60;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding,
  },
  imageContainer: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    padding: 15,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    padding: 10,
  },
  button: {
    position: "absolute",
    width: "100%",
    bottom: 16,
  },
  img1: {
    width: 250,
    height: 200,
  },
  img2: {
    width: 250,
    height: 150,
  },
});

export default function CarouselItem({
  item,
  index,
  onPress,
}: {
  item: { title: string; text: string };
  index: number;
  onPress: () => void;
}) {
  switch (index) {
    case 0:
      return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/carousel1.png")}
              style={styles.img1}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
          <Button onPress={onPress} label="進む" style={styles.button} />
        </View>
      );
    case 1:
      return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/carousel2.png")}
              style={styles.img2}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
          <Button onPress={onPress} label="進む" style={styles.button} />
        </View>
      );
    default:
      return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/carousel3.png")}
              style={styles.img1}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
          <Button onPress={onPress} label="始める!" style={styles.button} />
        </View>
      );
  }
}
