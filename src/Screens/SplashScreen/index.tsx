import React, {useEffect, useState} from 'react';
import {multiThemeColor, normalized} from '../../Utils/AppConstant';
import AnimatedContainer from '../../Components/CustomComponents';
import Picture from '../../Components/CustomComponents/Picture';
import {FigFinder, Splash_image} from '../../Assets';
import {View} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../Navigation/MainNavigation';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Set a timeout for 2 seconds before navigating to the main screen
    const timeoutId = setTimeout(() => {
      setInitializing(false);
      navigation.navigate('LogInMember'); // Replace 'MainScreen' with the name of your main navigation screen
    }, 2000);

    // Cleanup timeout if component is unmounted
    return () => clearTimeout(timeoutId);
  }, [navigation]);

  if (initializing) {
    return (
      <View
        style={{
          backgroundColor: multiThemeColor().main_background,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <AnimatedContainer
          delay={100}
          duration={800}
          animationType="fadeInDown"
          isVisible={true}>
          <Picture
            localSource={FigFinder}
            height={normalized.hp('50%')}
            width={normalized.hp('70%')}
            resizeMode="contain"
          />
        </AnimatedContainer>
      </View>
    );
  }

  return null;
};

export default SplashScreen;
