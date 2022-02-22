import React from "react";
import { Alert, Platform, View } from "react-native";
import { AdMobBanner } from "expo-ads-admob";

export default function Admob() {
  return (
    <View>
      <AdMobBanner
        adUnitID={
          __DEV__
            ? "ca-app-pub-3940256099942544/6300978111"
            : Platform.select({
                ios: "ca-app-pub-5412666419170729/4488784045",
              })
        }
        onDidFailToReceiveAdWithError={() => {
          Alert.alert("データの読み込みに失敗しました。");
        }}
        servePersonalizedAds
      />
    </View>
  );
}
