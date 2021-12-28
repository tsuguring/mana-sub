import React from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { COLOR } from "../../constants/theme";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  conteiner: {
    padding: 10,
  },
  contentContainer: {
    backgroundColor: COLOR.WHITE,
    borderLeftWidth: 10,
    borderColor: COLOR.PRIMARY,
    height: 70,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
  },
  money: {
    fontSize: 16,
  },
});

interface Props {
  onPress: () => void;
  id: string;
  title: string;
  money: string;
  period: string;
  date: string;
  detail: string | undefined;
}

export default function SubscriptionDisplay(props: Props) {
  const { onPress, id, title, money } = props;

  function deleteSubscription() {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const ref = db
        .collection(`users/${currentUser.uid}/subscriptions`)
        .doc(id);
      Alert.alert("サブスクリプションを削除します", "よろしいですか?", [
        {
          text: "キャンセル",
          onPress: () => {},
        },
        {
          text: "削除する",
          style: "destructive",
          onPress: () => {
            ref.delete().catch(() => {
              Alert.alert("削除に失敗しました");
            });
          },
        },
      ]);
    }
  }

  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.contentContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.money}>{money}円</Text>
        </View>
        <TouchableOpacity onPress={deleteSubscription}>
          <Icon name="delete" size={22} color={COLOR.BLACK} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}
