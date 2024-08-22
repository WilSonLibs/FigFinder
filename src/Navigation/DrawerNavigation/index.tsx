import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import CustomDrawerContent from '../../Components/CustomComponents/CustomDrawerContent';
import {MaterialIcons, multiThemeColor} from '../../Utils/AppConstant';
import HeaderLeft from '../../Components/CustomComponents/HeaderLeft';
import {RootStackParamList} from '../../Navigation/MainNavigation';
import {BarIcon, TeamIcon, LogoutMemberIcon} from '../../Utils/Icons/Icons';
import Home from '../../Screens/Home';
import OurTeam from '../../Screens/OurTeam';
import LogOutMember from '../../Screens/LogOutMember/LogOutMember';

type DrawerParamList = {
  Home: undefined;
  'Top Universities': undefined;
  MeritList: undefined;
  'Open Addmission': undefined;
  'Our Team': undefined;
  LogOut: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigation = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({route}) => ({
        // drawerActiveBackgroundColor: '#00b0eb',
        drawerActiveBackgroundColor: 'black',
        drawerStyle: {
          backgroundColor: multiThemeColor().main_background,
        },
        drawerLabelStyle: ({focused}) => ({
          color: focused ? 'white' : multiThemeColor().textcolor,
        }),
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: multiThemeColor().textcolor,
        drawerPosition: 'left',
        headerStyle: {
          // backgroundColor: '#00b0eb',
          backgroundColor: 'black',
        },
        drawerType: 'back',
        headerShadowVisible: false,
        headerTitle: '',
        headerLeft: () => (
          <HeaderLeft
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
        headerRight: () => (
          <TouchableOpacity style={{marginRight: 20}}>
            <MaterialIcons name="keyboard-control" size={25} color="white" />
          </TouchableOpacity>
        ),
      })}
      initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({focused}) => (
            <BarIcon color={focused ? 'white' : multiThemeColor().textcolor} />
          ),
          //   headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Our Team"
        component={OurTeam}
        options={{
          drawerIcon: ({focused}) => (
            <TeamIcon color={focused ? 'white' : multiThemeColor().textcolor} />
          ),
        }}
      />
      <Drawer.Screen
        name="LogOut"
        component={LogOutMember}
        options={{
          drawerIcon: ({focused}) => (
            <LogoutMemberIcon
              color={focused ? 'white' : multiThemeColor().textcolor}
            />
          ),
        }}
      />
      {/*  <Drawer.Screen
        name="Open Addmission"
        component={OpenAddmission}
        options={{
          drawerIcon: ({focused}) => (
            <BarIcon color={focused ? 'white' : multiThemeColor().textcolor} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
