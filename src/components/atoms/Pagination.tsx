import React from "react";
import { StyleSheet } from "react-native";
import { Pagination as SCPagination } from "react-native-snap-carousel";
import { COLOR } from "../../constants/theme";

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: COLOR.MAIN,
  },
});

interface Props {
  length: number;
  index: number;
}

export default function Pagination(props: Props) {
  const { length, index } = props;
  return (
    <SCPagination
      dotsLength={length}
      activeDotIndex={index}
      dotStyle={styles.dot}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );
}
