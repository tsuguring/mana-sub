import React from "react";
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import { INITIAL, LOADING } from "../../constants/path";
import { Initial, Loading } from "../../components/pages";
import Home from "./Home";
import * as UiContext from "../../contexts/ui";

const Stack = createStackNavigator();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function switchingAuthStatus(status: UiContext.Status) {
  switch (status) {
    case UiContext.Status.AUTHORIZED:
      return <Home />;
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
