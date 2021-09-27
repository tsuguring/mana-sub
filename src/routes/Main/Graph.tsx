import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { GRAPH, DETAIL } from "../../constants/path";
import { Graph, Detail } from "../../components/pages";

const Stack = createStackNavigator();

function GraphNavigator() {
    return (
        <Stack.Navigator initialRouteName={GRAPH}>
            <Stack.Screen name={GRAPH} component={Graph} />
            <Stack.Screen name={DETAIL} component={Detail} />
        </Stack.Navigator>
    )
}

export default GraphNavigator;