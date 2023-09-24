import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  GameScreen,
  HomeScreen,
  LoginScreen,
  RewardScreen,
  RegisterScreen,
  RuleScreen,
  VerifyScreen,
  GuideScreen,
  ScanScreen,
  CollectionScreen,
  GiftScreen,
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
  Game: {type: boolean};
  Reward: undefined;
  Guide: undefined;
  Scan: undefined;
  Collection: undefined;
  Gift: undefined;
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
      <Main.Screen name="Game" component={GameScreen} />
      <Main.Screen name="Reward" component={RewardScreen} />
      <Main.Screen name="Guide" component={GuideScreen} />
      <Main.Screen name="Scan" component={ScanScreen} />
      <Main.Screen name="Collection" component={CollectionScreen} />
      <Main.Screen name="Gift" component={GiftScreen} />
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
