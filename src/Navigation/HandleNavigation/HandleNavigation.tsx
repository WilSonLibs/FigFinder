/* eslint-disable import/prefer-default-export */
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/routers';

interface NavigationFunctions {
  navigate: (screenName: string, params?: object) => void;
  goBack: () => void;
  replaceScreen: (screenName: string, params?: object) => void;
}

export const useStackNavigator = (): NavigationFunctions => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const navigate = (screenName: string, params?: object) => {
    navigation.navigate(screenName as any, params);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const replaceScreen = (screenName: string, params?: object) => {
    navigation.replace(screenName as any, params);
  };

  return {
    navigate,
    goBack,
    replaceScreen,
  };
};
