import * as React from 'react';

import {ActivityIndicator} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const LoadingScreen = () => {
  return (
    <BlurView className="absolute z-50 top-0 bottom-0 left-0 right-0 backdrop-blur flex justify-center items-center">
      <ActivityIndicator size="large" color="black" />
    </BlurView>
  );
};

export default LoadingScreen;
