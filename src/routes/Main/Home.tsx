import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HOME, DETAIL } from "../../constants/path";
import { Home, Detail } from "../../components/pages";

const Stack = createStackNavigator();

function HomeNavigator() {
    return (
        <Stack.Navigator initialRouteName={HOME}>
            <Stack.Screen name={HOME} component={Home} />
            <Stack.Screen name={DETAIL} component={Detail} />
        </Stack.Navigator>
    )
}

export default HomeNavigator;