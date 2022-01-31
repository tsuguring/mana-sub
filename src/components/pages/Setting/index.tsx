import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLOR } from "../../../constants/theme";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemcontainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    backgroundColor: COLOR.WHITE,
  },
});

const Item = ({ title }: { title: string }) => (
  <TouchableOpacity style={styles.itemcontainer}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

const SETTING = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    screenname: "",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const SUPORT = [
  {
    id: "bddacbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-d4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571d29d72",
    title: "Third Item",
  },
];

const OTHERS = [
  {
    id: "bddacbea-c1b1-46c2-aed5-3ad53abbk8ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-d4f8-fbd9uaa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-845571d29d72",
    title: "Third Item",
  },
];

export default function Setting() {
  return (
    <LinearGradient
      colors={[COLOR.MAIN, COLOR.MAIN, COLOR.WHITE]}
      style={styles.container}
    >
      <ScrollView>
        <View style={{ paddingTop: 15 }}>
          <Text
            style={{
              padding: 12,
              fontSize: 16,
            }}
          >
            設定
          </Text>
          <View>
            <FlatList
              data={SETTING}
              renderItem={({ item }) => <Item title={item.title} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
        <View style={{ paddingTop: 15 }}>
          <Text
            style={{
              padding: 12,
              fontSize: 16,
            }}
          >
            サポート
          </Text>
          <FlatList
            data={SUPORT}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={{ paddingTop: 15 }}>
          <Text
            style={{
              padding: 12,
              fontSize: 16,
            }}
          >
            その他
          </Text>
          <FlatList
            data={OTHERS}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
