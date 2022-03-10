import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LOADING } from "../../constants/path";
import { Setting, Loading } from "../../components/pages";
import { COLOR } from "../../constants/theme";

const Stack = createStackNavigator();

function SettingNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SETTING"
        component={Setting}
        options={{
          title: "設定",
          headerStyle: {
            backgroundColor: COLOR.MAIN,
          },
          headerTitleStyle: {
            color: COLOR.WHITE,
          },
          headerTintColor: COLOR.WHITE,
        }}
      />
      <Stack.Screen
        name={LOADING}
        component={Loading}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default SettingNavigator;
