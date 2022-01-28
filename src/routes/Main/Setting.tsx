import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DETAIL } from "../../constants/path";
import { Setting, Detail } from "../../components/pages";

const Stack = createStackNavigator();

function SettingNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SETTING"
        component={Setting}
        options={{ title: "設定", headerShown: false }}
      />
      <Stack.Screen name={DETAIL} component={Detail} />
    </Stack.Navigator>
  );
}

export default SettingNavigator;
