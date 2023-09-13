import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  RuleScreen,
  VerifyScreen,
} from '@screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector, selectIsLoggedIn} from '@data';

export type RootAuthParamLists = {
  Login: undefined;
  Register: undefined;
  Rule: undefined;
  Verify: {phoneNumber: string; name?: string; type: boolean};
};

export type RootMainParamLists = {
  Home: undefined;
};

const Auth = createNativeStackNavigator<RootAuthParamLists>();
const Main = createNativeStackNavigator<RootMainParamLists>();

const AuthNavigation: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Register" component={RegisterScreen} />
      <Auth.Screen name="Rule" component={RuleScreen} />
      <Auth.Screen name="Verify" component={VerifyScreen} />
    </Auth.Navigator>
  );
};

const MainNavigation: React.FC = () => {
  return (
    <Main.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Main.Screen name="Home" component={HomeScreen} />
    </Main.Navigator>
  );
};

const _RootNavigation: React.FC = () => {
  const isLogin = useAppSelector(selectIsLoggedIn);
  return (
    <NavigationContainer>
      {isLogin ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export const RootNavigation = React.memo(_RootNavigation);
