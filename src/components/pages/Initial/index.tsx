import React, { useCallback, useRef, useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "../../organisms/Carousel";
import Pagination from "../../atoms/Pagination";
import { Context, Status } from "../../../contexts/ui";
import { COLOR } from "../../../constants/theme";

const padding = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding,
    backgroundColor: COLOR.MAIN,
  },
});

const renderData = [
  {
    text: "皆さんはサブスクリプションで月にどれくらい出費をしていますか？",
  },
  {
    text: "契約しているサブスクリプションの情報を入力し、自分の出費を確認しましょう。",
  },
  {
    text: "支払いが近づくと、通知を知らせてくれます。",
  },
];

export default function Initial() {
  const [activeSlide, changeSlide] = useState(0);
  const { setApplicationState } = useContext(Context);

  const carouselRef = useRef(null);
  const onEnd = useCallback(() => {
    setApplicationState(Status.AUTHORIZED);
  }, [setApplicationState]);

  const onNext = useCallback(() => {
    const nextIndex =
      activeSlide === renderData.length - 1 ? activeSlide : 1 + activeSlide;
    setTimeout(() => {
      if (!carouselRef || !carouselRef.current) {
        return;
      }
      const carousel = carouselRef.current as any;
      carousel.snapToItem(nextIndex);
    }, 250);
    changeSlide(nextIndex);
  }, [activeSlide]);

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        data={renderData}
        onEnd={onEnd}
        onNext={onNext}
        carouselRef={carouselRef}
        onSnapToItem={changeSlide}
      />
      <Pagination length={renderData.length} index={activeSlide} />
    </SafeAreaView>
  );
}
