import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import NavigationManager from './components/stacks';

export default function App() {
  return (
    // <Provider store={store}>
    // <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
      <NavigationManager />
    </NavigationContainer>
    // </PersistGate>
    // </Provider>
  );
}
