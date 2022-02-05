import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { INQUIRIES, LOADING } from "../../constants/path";
import { Setting, Loading, Inquiries } from "../../components/pages";
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
        }}
      />
      <Stack.Screen
        name={LOADING}
        component={Loading}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={INQUIRIES}
        component={Inquiries}
        options={{
          headerStyle: {
            backgroundColor: COLOR.MAIN,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default SettingNavigator;
