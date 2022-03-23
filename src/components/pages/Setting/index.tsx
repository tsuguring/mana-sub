import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Share,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLOR } from "../../../constants/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth, deleteUser } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { LOADING } from "../../../constants/path";
import { Admob } from "../../atoms";
import { openURL } from "expo-linking";
import * as Notifications from "expo-notifications";

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
  notificationsetting: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLOR.GRAY_LIGHT,
    padding: 14,
    backgroundColor: COLOR.WHITE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notificationsettingleft: {
    flexDirection: "row",
  },
  notificationsettingright: {
    flexDirection: "row",
    fontSize: 16,
  },
  listtop: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLOR.GRAY_LIGHT,
    padding: 14,
    backgroundColor: COLOR.WHITE,
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    borderBottomWidth: 1,
    borderColor: COLOR.GRAY_LIGHT,
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
    borderColor: COLOR.GRAY_LIGHT,
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

async function allCansel() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export default function Setting() {
  const navigation = useNavigation<any>();
  const [permissionCheck, setPermissionCheck] = useState(false);

  const permissionsAsync = async () => {
    await Notifications.getPermissionsAsync().then((data) => {
      setPermissionCheck(data.granted);
    });
  };

  useEffect(() => {
    permissionsAsync();
  }, []);

  function deleteuser() {
    const user = getAuth().currentUser;
    if (user) {
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
              deleteUser(user)
                .then(() => {
                  allCansel();
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

  function moveSetting() {
    openURL("app-settings:");
    permissionsAsync();
  }

  function moveHomepage() {
    openURL("https://tsuguring.github.io/manasub-page/");
  }

  function moveReview() {
    openURL(
      "https://itunes.apple.com/jp/app/id1615263355?mt=8&action=write-review"
    );
  }

  function moveInquiries() {
    openURL(
      "https://docs.google.com/forms/d/e/1FAIpQLScpz38vrQ4KgTqT_4oj69h1clGFJHwil1E8BqaRgGtpb-JUTw/viewform?usp=sf_link"
    );
  }

  function moveDeveloperBlog() {
    openURL("https://tsugu-blog.vercel.app/");
  }

  function moveTerms() {
    openURL("https://tsuguring.github.io/manasub-page/TermsOfUse.html");
  }

  function movePrivacy() {
    openURL("https://tsuguring.github.io/manasub-page/PrivacyPolicy.html");
  }

  const ShareApp = async () => {
    try {
      const result = await Share.share({
        title: "manasub",
        message:
          "サブスクリプションを管理しよう！\nhttps://itunes.apple.com/jp/app/id1615263355?mt=8",
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
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.listcontainer}>
          <Text style={styles.title}>設定</Text>
          <TouchableOpacity
            style={styles.notificationsetting}
            onPress={moveSetting}
          >
            <View style={styles.notificationsettingleft}>
              <Icon
                name="bell"
                size={20}
                color={COLOR.GRAY}
                style={{ paddingRight: 14 }}
              />
              <Text style={styles.listtitle}>支払日前に通知でお知らせ</Text>
            </View>
            {permissionCheck ? (
              <Text style={styles.notificationsettingright}>オン</Text>
            ) : (
              <Text style={styles.notificationsettingright}>オフ</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.list} onPress={deleteuser}>
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
          <TouchableOpacity style={styles.listtop} onPress={moveHomepage}>
            <Icon
              name="list-alt"
              size={20}
              color={COLOR.GRAY}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>manasubホームページ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list} onPress={moveReview}>
            <Icon
              name="star"
              size={20}
              color={COLOR.GRAY}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>manasubを応援する</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list} onPress={ShareApp}>
            <Icon
              name="group"
              size={20}
              color={COLOR.GRAY}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>manasubをシェアする</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list} onPress={moveInquiries}>
            <Icon
              name="envelope"
              size={20}
              color={COLOR.GRAY}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>お問合せ・不具合を報告する</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listcontainer}>
          <Text style={styles.title}>その他</Text>
          <TouchableOpacity style={styles.listtop} onPress={moveDeveloperBlog}>
            <Icon
              name="info-circle"
              size={20}
              color={COLOR.GRAY}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>開発者ブログ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list} onPress={moveTerms}>
            <Icon
              name="info-circle"
              size={20}
              color={COLOR.GRAY}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>利用規約</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list} onPress={movePrivacy}>
            <Icon
              name="info-circle"
              size={20}
              color={COLOR.GRAY}
              style={{ paddingRight: 14 }}
            />
            <Text style={styles.listtitle}>プリバシーポリシー</Text>
          </TouchableOpacity>
          <View style={styles.version}>
            <View style={styles.versionleft}>
              <Icon
                name="info-circle"
                size={20}
                color={COLOR.GRAY}
                style={{ paddingRight: 14 }}
              />
              <Text style={styles.listtitle}>バージョン</Text>
            </View>
            <Text style={styles.versionright}>1.0.1</Text>
          </View>
        </View>
      </ScrollView>
      <Admob />
    </View>
  );
}
