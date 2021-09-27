import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SETTING, DETAIL } from "../../constants/path";
import { Setting, Detail } from "../../components/pages";

const Stack = createStackNavigator();

function SettingNavigator() {
    return (
        <Stack.Navigator initialRouteName={SETTING}>
            <Stack.Screen name={SETTING} component={Setting} />
            <Stack.Screen name={DETAIL} component={Detail} />
        </Stack.Navigator>
    )
}

export default SettingNavigator;