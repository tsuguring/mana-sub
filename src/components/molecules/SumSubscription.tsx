import React from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import { COLOR } from "../../constants/theme";
import RNPickerSelect from "react-native-picker-select";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    width: "75%",
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.GRAY_LIGHT,
  },
  sumconteiner: {
    justifyContent: "center",
    alignItems: "center",
  },
  functioncontsiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    padding: 7,
    marginTop: 20,
    backgroundColor: COLOR.WHITE,
    borderWidth: 0.5,
    borderColor: "#C0C0C0",
    borderRadius: 5,
  },
  inputAndroid: {},
});

interface Props {
  sumsubscriptions: number;
  changemoney: boolean;
  setChangemoney: React.Dispatch<React.SetStateAction<boolean>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sumsubscription(props: Props) {
  const { changemoney, sumsubscriptions, setChangemoney, setSort } = props;
  const toggleSwitch = () => setChangemoney((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.sumconteiner}>
        <Text style={styles.titletext}>合計金額</Text>
        {changemoney ? (
          <Text>
            <Text style={styles.subtext}>¥</Text>
            <Text style={styles.summoneytext}>
              {(Math.trunc(sumsubscriptions) * 12).toLocaleString()}
            </Text>
            <Text style={styles.subtext}>/年</Text>
          </Text>
        ) : (
          <Text>
            <Text style={styles.subtext}>¥</Text>
            <Text style={styles.summoneytext}>
              {Math.trunc(sumsubscriptions).toLocaleString()}
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
            trackColor={{ false: COLOR.MAIN, true: COLOR.PRIMARY }}
            ios_backgroundColor={COLOR.MAIN}
            onValueChange={toggleSwitch}
            value={changemoney}
          />
        </View>
        <RNPickerSelect
          onValueChange={(selectedperiod: string) => {
            setSort(selectedperiod);
          }}
          placeholder={{}}
          items={[
            { label: "金額(大きい順)", value: "muchmoney" },
            { label: "金額(小さい順)", value: "littlemoney" },
            { label: "支払日(近い順)", value: "nearpayment" },
            { label: "支払日(遠い順)", value: "farpayment" },
          ]}
          doneText="完了"
          style={pickerSelectStyles}
        />
      </View>
    </View>
  );
}
