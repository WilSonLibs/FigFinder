import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../Navigation/MainNavigation';
import {multiThemeColor} from '../../Utils/AppConstant';
import ConnectionStatusModal from '../../Components/CustomComponents/ConnectionStatusToast';
import Space from '../../Components/CustomComponents/Space';
import Heading from '../../Components/CustomComponents/Heading';
import LottieView from 'lottie-react-native';
import Button from '../../Components/CustomComponents/Button';

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      ToastAndroid.show(
        'Kindly fill in all details correctly',
        ToastAndroid.SHORT,
      );
      return;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: multiThemeColor().main_background},
      ]}>
      <ConnectionStatusModal />
      <View
        style={{
          backgroundColor: 'black',
          height: 150,
          width: 150,
          borderRadius: 100,
          marginTop: -70,
          marginRight: -270,
        }}
      />

      <Space height={30} />
      <Heading text="Login" weight={'bold'} fontSize={25} />
      <Space height={30} />
      <View>
        <Heading text="Name*" color="black" weight={700} />
        <Space height={5} />
        <TextInput
          placeholder="Enter your Name here  "
          value={email}
          onChangeText={text => setEmail(text)}
          style={[
            styles.textInput,
            {
              borderColor: multiThemeColor().textcolor,
              color: multiThemeColor().textcolor,
            },
          ]}
          placeholderTextColor={multiThemeColor().PlaceHolder}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Heading text="Email*" color="black" weight={700} />
        <Space height={5} />
        <TextInput
          placeholder="Enter your Email here  "
          value={email}
          onChangeText={text => setEmail(text)}
          style={[
            styles.textInput,
            {
              borderColor: multiThemeColor().textcolor,
              color: multiThemeColor().textcolor,
            },
          ]}
          placeholderTextColor={multiThemeColor().PlaceHolder}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Heading text="Password*" color="black" weight={700} />
        <Space height={5} />
        <TextInput
          placeholder="Enter your Password here "
          value={password}
          onChangeText={text => setPassword(text)}
          style={[
            styles.textInput,
            {
              borderColor: multiThemeColor().textcolor,
              color: multiThemeColor().textcolor,
            },
          ]}
          placeholderTextColor={multiThemeColor().PlaceHolder}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate('SignUpMember')}>
          <Text
            style={[styles.registerText, {color: multiThemeColor().textcolor}]}>
            Want to Register
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Space height={10} />
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            width: 300,
            height: 40,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 17}}>Login</Text>
        </TouchableOpacity>

        <Space height={100} />
      </View>
      <View
        style={{
          backgroundColor: 'black',
          height: 150,
          width: 150,
          borderRadius: 100,
          // marginBottom: 20,
          marginLeft: -250,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 30,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    color: 'white',
    width: 300,
    marginBottom: 30,
    borderRadius: 20,
  },
  registerLink: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  registerText: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default WelcomeScreen;
