import {useContext} from 'react';
import {ThemeContext} from '../Theme/ThemeContext';
import {RFPercentage as rf} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const multiThemeColor = () => {
  const context = useContext(ThemeContext);
  const theme = context?.theme || 'light';

  if (theme === 'light') {
    return {
      BLACK: '#181c1c',
      BLUE1: '#26c4f5',
      BLUE2: '#4976e8',
      BLUE3: '#4ce4fc',
      BLUE4: '#bbe5f5',
      PROS_COLOR: '#80a4fc',
      CONS_COLOR: '#ff4484',
      WHITE: '#ffff',
      TRANSPARENT: 'transparent',
      GRAY: '#282c34',
      main_background: '#FFFFFF',
      textcolor: '#000',
      GrayBox: 'lightgray',
      OnlyWHITE: '#FFF',
      PlaceHolder: '#282c34',
      ButtonBackGround: '#282c34',
    };
  } else {
    return {
      BLACK: '#181c1c',
      BLUE1: '#26c4f5',
      BLUE2: '#4976e8',
      BLUE3: '#4ce4fc',
      BLUE4: '#bbe5f5',
      PROS_COLOR: '#80a4fc',
      CONS_COLOR: '#ff4484',
      WHITE: '#ffff',
      TRANSPARENT: 'transparent',
      main_background: '#2F3E46',
      textcolor: '#fff',
      GRAY: '#000',
      GrayBox: '#181c1c',
      OnlyWHITE: '#FFF',
      PlaceHolder: '#ccc',
      ButtonBackGround: '#ffff',
    };
  }
};

export const normalizedFont = {rf};
export const normalized = {hp, wp};
export {MaterialIcons};
