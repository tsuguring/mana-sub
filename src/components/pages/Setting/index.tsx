import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "../../../constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function Setting() {
  return (
    <LinearGradient
      colors={[COLOR.MAIN, COLOR.MAIN, COLOR.WHITE]}
      style={styles.container}
    >
      <View>
        <Text
          style={{
            padding: 14,
            fontSize: 16,
          }}
        >
          設定
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 14,
            backgroundColor: COLOR.WHITE,
          }}
        >
          <Text style={{ fontSize: 16 }}>支払日前に通知でお知らせ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 14,
            backgroundColor: COLOR.WHITE,
          }}
        >
          <Text style={{ fontSize: 16 }}>支払日前に通知でお知らせ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 14,
            backgroundColor: COLOR.WHITE,
          }}
        >
          <Text style={{ fontSize: 16 }}>支払日前に通知でお知らせ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 14,
            backgroundColor: COLOR.WHITE,
          }}
        >
          <Text style={{ fontSize: 16 }}>支払日前に通知でお知らせ</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            padding: 14,
            fontSize: 16,
          }}
        >
          設定
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 14,
            backgroundColor: COLOR.WHITE,
          }}
        >
          <Text style={{ fontSize: 16 }}>支払日前に通知でお知らせ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 14,
            backgroundColor: COLOR.WHITE,
          }}
        >
          <Text style={{ fontSize: 16 }}>支払日前に通知でお知らせ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 14,
            backgroundColor: COLOR.WHITE,
          }}
        >
          <Text style={{ fontSize: 16 }}>支払日前に通知でお知らせ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 14,
            backgroundColor: COLOR.WHITE,
          }}
        >
          <Text style={{ fontSize: 16 }}>支払日前に通知でお知らせ</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
