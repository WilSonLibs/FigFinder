import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../Navigation/MainNavigation';
import {multiThemeColor} from '../../Utils/AppConstant';
import ConnectionStatusModal from '../../Components/CustomComponents/ConnectionStatusToast';
import Space from '../../Components/CustomComponents/Space';
import Heading from '../../Components/CustomComponents/Heading';
import LottieView from 'lottie-react-native';
import Button from '../../Components/CustomComponents/Button';

const LoginMember: React.FC = () => {
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
    navigation.navigate('DrawerNavigation');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ConnectionStatusModal />
        <View
          style={{
            backgroundColor: 'black',
            height: 150,
            width: 150,
            borderRadius: 100,
            position: 'absolute',
            top: -90,
            right: -50,
          }}
        />

        <Space height={30} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Space height={100} />
          <Heading text="Login" weight={'bold'} fontSize={25} />
          <Space height={30} />
          <View>
            <Heading text="Email*" color="black" weight={700} />
            <Space height={5} />
            <TextInput
              placeholder="Enter your Email here"
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
              placeholder="Enter your Password here"
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
                style={[
                  styles.registerText,
                  {color: multiThemeColor().textcolor},
                ]}>
                Want to Register
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Space height={10} />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <Space height={50} />
          </View>
          <Space height={100} />
        </View>
        <View
          style={{
            backgroundColor: 'black',
            height: 150,
            width: 150,
            borderRadius: 100,
            position: 'absolute',
            bottom: -150,
            left: -50,
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
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
  loginButton: {
    backgroundColor: 'black',
    width: 300,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 17,
  },
});

export default LoginMember;
