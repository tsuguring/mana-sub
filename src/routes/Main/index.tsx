import React from "react";
import { createStackNavigator, StackCardInterpolationProps } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { INITIAL, LOADING, HOME, CHOOSE_LOGIN, GRAPH, SETTING } from "../../constants/path";
import { Initial, Loading, ChooseLogin, Graph, Setting } from "../../components/pages";
import Home from './Home';
import * as UiContext from '../../contexts/ui';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const forFade = ({ current }: StackCardInterpolationProps) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

function TabRoutes() {
    return (
        <Tab.Navigator initialRouteName={HOME}>
            <Tab.Screen name={HOME} component={Home} />
            <Tab.Screen name={GRAPH} component={Graph} />
            <Tab.Screen name={SETTING} component={Setting} />
        </Tab.Navigator>
    )
}

function switchingAuthStatus(status: UiContext.Status) {
    switch (status) {
        case UiContext.Status.UN_AUTHORIZED:
            return <Stack.Screen name={CHOOSE_LOGIN} component={ChooseLogin}/>
        case UiContext.Status.AUTHORIZED:
            return <Stack.Screen name={HOME} component={TabRoutes}/>
        case UiContext.Status.FIRST_OPEN:
        default:
            return <Stack.Screen name={INITIAL} component={Initial}/>
    }
}

function AuthWithRoutes() {
    const uiContext = React.useContext(UiContext.Context);
    return (
        <Stack.Navigator initialRouteName={LOADING} headerMode='none' screenOptions={{cardStyleInterpolator: forFade}}>
            {uiContext.applicationState !== UiContext.Status.LOADING ? (
                switchingAuthStatus(uiContext.applicationState)
            ) : (
                <Stack.Screen name={LOADING} component={Loading} />
            )}
        </Stack.Navigator>
    );
}
export default AuthWithRoutes;