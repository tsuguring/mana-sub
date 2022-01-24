import React, { useState } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import { COLOR } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.MAIN_LIGHT,
    width: "75%",
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 10,
  },
  sumconteiner: {
    justifyContent: "center",
    alignItems: "center",
  },
  functioncontsiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  titletext: {
    fontSize: 16,
    fontWeight: "500",
    paddingBottom: 10,
  },
  subtext: {
    fontSize: 20,
  },
  summoneytext: {
    fontSize: 36,
  },
  button: {
    backgroundColor: COLOR.WHITE,
  },
});

interface Props {
  sumsubscriptions: number;
  changemoney: boolean;
  setChangemoney: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sumsubscription(props: Props) {
  const { changemoney, setChangemoney, sumsubscriptions } = props;
  const toggleSwitch = () => setChangemoney((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.sumconteiner}>
        <Text style={styles.titletext}>合計金額</Text>
        {changemoney ? (
          <Text>
            <Text style={styles.subtext}>¥</Text>
            <Text style={styles.summoneytext}>
              {(sumsubscriptions * 12).toLocaleString()}
            </Text>
            <Text style={styles.subtext}>/年</Text>
          </Text>
        ) : (
          <Text>
            <Text style={styles.subtext}>¥</Text>
            <Text style={styles.summoneytext}>
              {sumsubscriptions.toLocaleString()}
            </Text>
            <Text style={styles.subtext}>/月</Text>
          </Text>
        )}
      </View>
      <View style={styles.functioncontsiner}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {changemoney ? (
            <Text style={{ fontWeight: "400", paddingBottom: 5 }}>年額</Text>
          ) : (
            <Text style={{ fontWeight: "400", paddingBottom: 5 }}>月額</Text>
          )}
          <Switch
            trackColor={{ false: COLOR.BLACK, true: COLOR.PRIMARY }}
            ios_backgroundColor={COLOR.BLACK}
            onValueChange={toggleSwitch}
            value={changemoney}
          />
        </View>
      </View>
    </View>
  );
}
