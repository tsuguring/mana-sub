import React from "react";
import { View, StyleSheet, Text, Alert, Share } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "../../../constants/theme";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { LOADING } from "../../../constants/path";
import { Admob } from "../../atoms";
import { openURL } from "expo-linking";

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
  version: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    backgroundColor: COLOR.WHITE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  versionleft: {
    flexDirection: "row",
  },
  versionright: {
    flexDirection: "row",
    fontSize: 16,
    letterSpacing: 3,
  },
});

export default function Setting() {
  const navigation = useNavigation<any>();

  function deleteUser() {
    const { currentUser } = getAuth();
    if (currentUser) {
      Alert.alert(
        "データを初期化しログアウトします",
        "ログアウトすると現在のデータは全て消されます。よろしいですか?",
        [
          {
            text: "キャンセル",
            onPress: () => {},
          },
          {
            text: "ログアウト",
            style: "destructive",
            onPress: () => {
              currentUser
                .delete()
                .then(() => {
                  navigation.reset({ index: 0, routes: [{ name: LOADING }] });
                })
                .catch(() => {
                  Alert.alert("ログアウトに失敗しました。");
                });
            },
          },
        ]
      );
    }
  }

  function moveInquiries() {
    openURL("mailto: tsuguri4429@gmail.com");
  }

  function moveTerms() {
    openURL("https://tsuguring.github.io/TermsOfUse.html");
  }

  function movePrivacy() {
    openURL("https://tsuguring.github.io/PrivacyPolicy.html");
  }

  const ShareApp = async () => {
    try {
      const result = await Share.share({
        title: "manasub",
        message: "サブスクリプションを管理しよう！ url",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert("データの読み込みに失敗しました。");
    }
  };

  return (
    <LinearGradient
      colors={[COLOR.MAIN, COLOR.MAIN, COLOR.WHITE]}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.listcontainer}>
          <Text style={styles.title}>設定</Text>
          <TouchableOpacity style={styles.listtop}>
            <Icon
              name="bell"
              size={20}
              color={"#999999"}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>支払日前に通知でお知らせ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list} onPress={deleteUser}>
            <Icon
              name="warning"
              size={20}
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
              size={20}
              color={"#999999"}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>mana-subを応援する</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list} onPress={ShareApp}>
            <Icon
              name="group"
              size={20}
              color={"#999999"}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>mana-subをシェアする</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list} onPress={moveInquiries}>
            <Icon
              name="envelope"
              size={20}
              color={"#999999"}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>お問合せ・不具合を報告する</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listcontainer}>
          <Text style={styles.title}>その他</Text>
          <TouchableOpacity style={styles.listtop} onPress={moveTerms}>
            <Icon
              name="info-circle"
              size={20}
              color={"#999999"}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>利用規約</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list} onPress={movePrivacy}>
            <Icon
              name="info-circle"
              size={20}
              color={"#999999"}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>プリバシーポリシー</Text>
          </TouchableOpacity>
          <View style={styles.version}>
            <View style={styles.versionleft}>
              <Icon
                name="info-circle"
                size={20}
                color={"#999999"}
                style={{ paddingRight: 14 }}
              />
              <Text style={styles.listtitle}>バージョン</Text>
            </View>
            <Text style={styles.versionright}>1.0.0</Text>
          </View>
        </View>
      </ScrollView>
      <Admob />
    </LinearGradient>
  );
}
