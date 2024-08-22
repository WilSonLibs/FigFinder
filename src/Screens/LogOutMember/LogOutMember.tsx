import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import LottieView from 'lottie-react-native';
// import {multiThemeColor} from '../utils/AppConstants';
// import Heading from '../../../Components/CustomComponents/Heading';
// import Space from '../../../Components/CustomComponents/Space';
// import SubHeading from '../../../Components/CustomComponents/SubHeading';
// import Button from '../../../Components/CustomComponents/Button';
import {
  NavigationProp,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {RootStackParamList} from '../../Navigation/MainNavigation';
import {multiThemeColor} from '../../Utils/AppConstant';
import ConnectionStatusModal from '../../Components/CustomComponents/ConnectionStatusToast';
import Heading from '../../Components/CustomComponents/Heading';
import Space from '../../Components/CustomComponents/Space';
import SubHeading from '../../Components/CustomComponents/SubHeading';
import Button from '../../Components/CustomComponents/Button';
// import {handleLogoutMember} from '../FireBase/AuthFunction';
// import {RootStackParamList} from '../../../Navigation/MainNavigation/MainNavigation';
// import {multiThemeColor} from '../../../Utils/AppConstants';
// import {handleLogoutMember} from '../../../Utils/Auth/AuthFunction';
// import ConnectionStatusToast from '../../../Components/CustomComponents/ConnectionStatusToast';

// Define the type for the route parameters
type LogOutMemberRouteParams = {
  UserID: string;
};

const LogOutMember = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route =
    useRoute<RouteProp<{params: LogOutMemberRouteParams}, 'params'>>();
  // const {UserID} = route.params;

  return (
    <View
      style={{
        flex: 1,
        alignContent: 'flex-start',
        alignSelf: 'center',
        backgroundColor: multiThemeColor().main_background,
        width: '100%',
      }}>
      <ConnectionStatusModal />
      {/* <Heading
        text="Agree to Logout ?"
        style={{
          color: multiThemeColor().textcolor,
          marginTop: 20,
          fontSize: 40,
        }}
        textAlign="center"
      /> */}
      <Space height={80} />
      <View
        style={{
          height: 200,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <LottieView
          source={require('../../Assets/Animation/logoutnew.json')}
          autoPlay
          loop
          style={{
            height: 400,
            width: 500,
            alignContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        />
      </View>
      <SubHeading
        text="I want to logout from this account and also delete my current data on this app"
        style={{padding: 50, fontSize: 15}}
        textAlign="center"
      />
      <Button
        title="LogOut"
        onPress={() => navigation.navigate('WelcomeScreen')}
        // backgroundColor={multiThemeColor().textcolor}
        backgroundColor="black"
        TextColor={multiThemeColor().main_background}
      />
      <Space height={15} />
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
        // onPress={() => Alert.alert('Go to the main Page')}
        backgroundColor="black"
        TextColor={multiThemeColor().main_background}
      />
    </View>
  );
};

export default LogOutMember;

const styles = StyleSheet.create({});
