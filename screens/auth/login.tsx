import * as React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {useRef, useState} from 'react';
import {Logo} from '../../assets';
import LoadingScreen from '../../components/common/loading';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {setUser} from '../../_redux/user/userSlice';

const LoginSC: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    if (email.length === 0) {
      Alert.alert('Email is required', 'Please enter your email to continue');
      emailRef?.current?.focus();
      return;
    }

    if (password.length === 0) {
      Alert.alert(
        'Password is required',
        'Please enter your password to continue',
      );
      passwordRef?.current?.focus();
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        'http://localhost:8080/api/vnb/v1/auth/login',
        {
          email,
          password,
        },
      );
      await dispatch(setUser(res?.data?.metadata));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Wrong Credentials', error?.response?.data?.message);
    }
  };
  return (
    <SafeAreaView className="flex-1 relative">
      <View className="mt-20 px-6">
        <View className=" flex justify-center items-center">
          <Image className="w-[80px] h-[80px]" source={Logo} />
        </View>

        <View className="mt-10">
          <Text className="text-base text-gray-500">Email</Text>
          <TextInput
            ref={emailRef}
            onChangeText={setEmail}
            autoCapitalize="none"
            className="border-b-[1px] border-gray-300 py-4 text-base"
          />
        </View>
        <View className="mt-7">
          <Text className="text-base text-gray-500">Password</Text>
          <View className=" relative">
            <TextInput
              ref={passwordRef}
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              autoCapitalize="none"
              className="border-b-[1px] border-gray-300 py-4 text-base"
            />
            {password && password.length > 0 && (
              <TouchableOpacity
                onPress={() => setShowPassword(prev => !prev)}
                className=" absolute right-0 bottom-5">
                {/* {showPassword ? (
                  <Ionicons name="md-eye-outline" size={24} color="black" />
                ) : (
                  <Ionicons name="md-eye-off-outline" size={24} color="black" />
                )} */}
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View className="mt-10">
          <TouchableOpacity
            className=" bg-primary rounded-lg"
            onPress={handleLogin}>
            <Text className="text-white text-lg font-medium py-4 rounded-lg text-center">
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-center mt-5 text-base text-gray-700">
          Forgot password?
        </Text>
      </View>

      <View className="absolute bottom-12 left-0 right-0 mx-6">
        <TouchableOpacity
          className="border border-primary py-2 rounded-md"
          onPress={() => navigation.push('Register')}>
          <Text className="text-base text-primary text-center">
            Create new account
          </Text>
        </TouchableOpacity>
      </View>

      {loading && <LoadingScreen />}
    </SafeAreaView>
  );
};

export default LoginSC;
