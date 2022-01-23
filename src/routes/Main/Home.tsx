import React from "react";
import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/theme";
import { createStackNavigator } from "@react-navigation/stack";
import { HOME, DETAIL } from "../../constants/path";
import { Home, Detail } from "../../components/pages";

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLOR.MAIN_DARK,
  },
});

const Stack = createStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={HOME}
      screenOptions={{ headerStyle: styles.header }}
    >
      <Stack.Screen name={HOME} component={Home} />
      <Stack.Screen name={DETAIL} component={Detail} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
