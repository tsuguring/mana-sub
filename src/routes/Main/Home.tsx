import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DETAIL, HOME, INPUT, SETTING } from "../../constants/path";
import { Detail, Home, Input } from "../../components/pages";
import Setting from "./Setting";
import { COLOR } from "../../constants/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
          headerStyle: {
            backgroundColor: COLOR.MAIN,
          },
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
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="HOME"
          component={TabRoutes}
          options={{ title: "ホーム", headerShown: false }}
        />
        <Stack.Screen
          name={DETAIL}
          component={Detail}
          options={{
            headerStyle: {
              backgroundColor: COLOR.MAIN,
            },
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name={INPUT}
          component={Input}
          options={{
            headerStyle: {
              backgroundColor: COLOR.MAIN,
            },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default HomeNavigator;
