import React from "react";
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { COLOR } from "../../constants/theme";
import {
  INITIAL,
  LOADING,
  HOME,
  INPUT,
  DETAIL,
  SETTING,
  GRAPH,
} from "../../constants/path";
import {
  Initial,
  Loading,
  Home,
  Input,
  Detail,
  Setting,
  Graph,
} from "../../components/pages";
import * as UiContext from "../../contexts/ui";
import Icon from "react-native-vector-icons/FontAwesome";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLOR.MAIN_DARK,
  },
});

interface Params {
  id: string;
}

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function TabRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={HOME}
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="home"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={GRAPH}
        component={Graph}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="signal"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SETTING}
        component={Setting}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="cog"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function switchingAuthStatus(status: UiContext.Status) {
  switch (status) {
    case UiContext.Status.AUTHORIZED:
      return (
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              name="HOME"
              component={TabRoutes}
              options={{ headerShown: false }}
            />
            <Stack.Screen name={DETAIL} component={Detail} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name={INPUT} component={Input} />
          </Stack.Group>
        </Stack.Navigator>
      );
    case UiContext.Status.FIRST_OPEN:
    default:
      return (
        <Stack.Navigator>
          <Stack.Screen
            name={INITIAL}
            component={Initial}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      );
  }
}

function AuthWithRoutes() {
  const uiContext = React.useContext(UiContext.Context);
  return (
    <>
      {uiContext.applicationState !== UiContext.Status.LOADING ? (
        switchingAuthStatus(uiContext.applicationState)
      ) : (
        <Stack.Navigator
          initialRouteName={LOADING}
          screenOptions={{ cardStyleInterpolator: forFade }}
        >
          <Stack.Screen
            name={LOADING}
            component={Loading}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </>
  );
}
export default AuthWithRoutes;
