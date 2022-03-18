import React, { useCallback, useRef, useState, useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
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
    backgroundColor: COLOR.WHITE,
  },
});

const renderData = [
  {
    title: "マナサブへようこそ！",
    text: "皆さんはサブスクリプションで月にどれくらい出費をしていますか？",
  },
  {
    title: "出費を確認して節約しよう",
    text: "契約しているサブスクリプションの情報を入力し、自分の出費を確認しましょう。月々支払っている金額が一目瞭然！",
  },
  {
    title: "知らせてくれる！",
    text: "サブスクリプションを解約し忘れたことありませんか？ 支払い3日前に通知で知らせてくれます。",
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
