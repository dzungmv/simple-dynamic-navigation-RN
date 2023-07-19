import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginSC from '../../screens/auth/login';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginSC} />
    </Stack.Navigator>
  );
}
