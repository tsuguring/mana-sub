import React from "react";
import { createStackNavigator, StackCardInterpolationProps } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { INITIAL, LOADING, HOME, CHOOSE_LOGIN, INPUT, SETTING, GRAPH, SIGN_IN, SIGN_UP } from "../../constants/path";
import { Initial, Loading, ChooseLogin, Input, SignIn, SignUp } from "../../components/pages";
import Home from './Home';
import Setting from './Setting';
import Graph from './Graph';
import * as UiContext from '../../contexts/ui';

const Stack = createStackNavigator();
const ModalStack = createStackNavigator();
const ChooseLoginStack = createStackNavigator();
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

function TabWithModalRoutes() {
    return (
        <ModalStack.Navigator mode='modal' headerMode='none'>
            <Stack.Screen name={HOME} component={TabRoutes} />
            <Stack.Screen name={INPUT} component={Input} />
        </ModalStack.Navigator>
    )
}

function ChooseLoginNavigator() {
    return (
        <ChooseLoginStack.Navigator initialRouteName={CHOOSE_LOGIN}>
            <ChooseLoginStack.Screen name={CHOOSE_LOGIN} component={ChooseLogin} />
            <ChooseLoginStack.Screen name={SIGN_IN} component={SignIn} />
            <ChooseLoginStack.Screen name={SIGN_UP} component={SignUp} />
        </ChooseLoginStack.Navigator>
    )
}

function switchingAuthStatus(status: UiContext.Status) {
    switch (status) {
        case UiContext.Status.UN_AUTHORIZED:
            return <Stack.Screen name={CHOOSE_LOGIN} component={ChooseLoginNavigator}/>
        case UiContext.Status.AUTHORIZED:
            return <Stack.Screen name={HOME} component={TabWithModalRoutes}/>
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