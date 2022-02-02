import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "../../../constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 12,
    fontSize: 16,
  },
  listcontainer: {
    paddingTop: 15,
  },
  listtop: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    backgroundColor: COLOR.WHITE,
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    backgroundColor: COLOR.WHITE,
    flexDirection: "row",
    alignItems: "center",
  },
  listtitle: {
    fontSize: 16,
  },
});

export default function Setting() {
  return (
    <LinearGradient
      colors={[COLOR.MAIN, COLOR.MAIN, COLOR.WHITE]}
      style={styles.container}
    >
      <View>
        <View style={styles.listcontainer}>
          <Text style={styles.title}>設定</Text>
          <TouchableOpacity style={styles.listtop}>
            <Icon
              name="bell"
              size={22}
              color={"#999999"}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>支払日前に通知でお知らせ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list}>
            <Icon
              name="warning"
              size={22}
              color={COLOR.CAUTION}
              style={{ paddingRight: 14 }}
            />
            <Text style={{ fontSize: 16, color: COLOR.CAUTION }}>
              データを初期化してログアウト
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listcontainer}>
          <Text style={styles.title}>サポート</Text>
          <TouchableOpacity style={styles.listtop}>
            <Icon
              name="star"
              size={22}
              color={"#999999"}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>mana-subを応援する</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list}>
            <Icon
              name="group"
              size={22}
              color={"#999999"}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>mana-subをシェアする</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list}>
            <Icon
              name="envelope"
              size={22}
              color={"#999999"}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>お問合せ・不具合を報告する</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listcontainer}>
          <Text style={styles.title}>その他</Text>
          <TouchableOpacity style={styles.listtop}>
            <Icon
              name="info-circle"
              size={22}
              color={"#999999"}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>ライセンス</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list}>
            <Icon
              name="info-circle"
              size={22}
              color={"#999999"}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>利用規約</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list}>
            <Icon
              name="info-circle"
              size={22}
              color={"#999999"}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>プリバシーポリシー</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list}>
            <Icon
              name="info-circle"
              size={22}
              color={"#999999"}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>バージョン</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
