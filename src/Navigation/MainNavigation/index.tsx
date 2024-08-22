import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {multiThemeColor} from '../../Utils/AppConstant';
import SplashScreen from '../../Screens/SplashScreen';
import DrawerNavigation from '../DrawerNavigation';
import WelcomeScreen from '../../Screens/WelcomeScreen/WelcomeScreen';
import SignUpMember from '../../Screens/SignUpMember/SignUpMember';
import LoginMember from '../../Screens/LoginMember/LoginMember';
import Home from '../../Screens/Home';
// import Test_Screen from '../../Screens/Test_Screen';

export type RootStackParamList = {
  SplashScreen: undefined;
  DrawerNavigation: undefined;
  WelcomeScreen: undefined;

  // Test_Screen: undefined;
  // SearchHome: {UserID: string | undefined};
  // ProandCons: {selectedItem: TopicDetail | undefined};
  // 'Dilemmas Description': {
  //   selectedItem?: TopicDetail | ProsConsType;
  //   UserID?: string;
  // };
  // Argument: {
  //   selectedItem: TopicDetail | ProsConsType;
  //   mode: 'add' | 'update';
  // };
  SignUpMember: undefined;
  LogInMember: undefined;
  Home: undefined;
  // PhoneNumberScreen: undefined;
  // OTPScreen: {confirm: FirebaseAuthTypes.ConfirmationResult};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigation: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const color = multiThemeColor();

  return (
    <>
      <StatusBar
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkTheme ? color.BLACK : color.WHITE}
      />
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="SignUpMember" component={SignUpMember} />
        <Stack.Screen name="LogInMember" component={LoginMember} />
        <Stack.Screen name="Home" component={Home} />
        {/*<Stack.Screen name="PhoneNumberScreen" component={PhoneNumberScreen} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} /> */}

        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        {/* <Stack.Screen name="Test_Screen" component={Test_Screen} /> */}
        {/* <Stack.Screen
          name="Dilemmas Description"
          component={Add_Dilemmas}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: multiThemeColor().GRAY},
            headerTintColor: color.OnlyWHITE,
          }}
        /> */}
        {/* <Stack.Screen
          name="SearchHome"
          component={SearchHome}
          options={{
            headerShown: false,
            headerStyle: {backgroundColor: multiThemeColor().GRAY},
            headerTintColor: color.OnlyWHITE,
          }}
        />
        <Stack.Screen
          name="ProandCons"
          component={ProandCons}
          options={{
            headerShown: false,
            headerStyle: {backgroundColor: multiThemeColor().GRAY},
            headerTintColor: color.OnlyWHITE,
          }}
        />
        <Stack.Screen
          name="Argument"
          component={AddArgument}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: multiThemeColor().GRAY},
            headerTintColor: color.OnlyWHITE,
          }}
        /> */}
      </Stack.Navigator>
    </>
  );
};

export default MainNavigation;
