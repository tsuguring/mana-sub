import React from 'react';
import * as UiContext from './src/contexts/ui'
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes';

export default function App() {
  const [applicationState, setApplicationState] = React.useState(UiContext.createApplicationInitialState());
  return (
    <UiContext.Context.Provider value={{ applicationState, setApplicationState }}>
      <Routes />
    </UiContext.Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
