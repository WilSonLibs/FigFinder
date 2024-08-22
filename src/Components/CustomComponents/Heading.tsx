import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  View,
} from 'react-native';
// import {
//   multiThemeColor,
//   normalized,
//   normalizedFont,
// } from '../../utils/AppConstants';
// import {View} from 'native-base';
// import { BackButton } from "../../assets/Svg";
// import {useStackNavigator} from '../../utils/HandleNavigation';
// import {useStackNavigator} from '../../Navigation/HandleNavigation/HandleNavigation';
import Space from './Space';
import {
  multiThemeColor,
  normalized,
  normalizedFont,
} from '../../Utils/AppConstant';
import {useNavigation} from '@react-navigation/native';
// import {
//   multiThemeColor,
//   normalized,
//   normalizedFont,
// } from '../../Utils/AppConstants';

interface HeadingProps {
  text: string;
  textAlign?: TextStyle['textAlign'];
  color?: string;
  fontFamily?: string;
  weight?: TextStyle['fontWeight'];
  fontSize?: number;
  backBtn?: boolean;
  marginLeft?: number;
  marginTop?: number;
  style?: TextStyle;
  [key: string]: any; // Other props
}

const Heading: React.FC<HeadingProps> = ({
  text,
  textAlign,
  color,
  fontFamily,
  weight,
  fontSize,
  backBtn,
  marginLeft,
  marginTop,
  style, // Changed to accept style prop
  ...restProps // Other props
}) => {
  const navigation = useNavigation();
  return (
    <>
      {!backBtn && (
        <>
          <Text
            style={{
              textAlign: textAlign,
              fontSize: fontSize || normalizedFont.rf(2.5),
              fontWeight: weight,
              color: color || multiThemeColor().textcolor,
              fontFamily: fontFamily,
              marginLeft: marginLeft,
              marginTop: marginTop,
              ...style, // Spread style prop here
            }}
            {...restProps} // Spread other props
          >
            {text}
          </Text>
        </>
      )}
      {backBtn && (
        <View style={[styles.container]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            {/* <BackButton /> */}
          </TouchableOpacity>
          <Text
            style={{
              textAlign: textAlign,
              fontSize: fontSize || normalizedFont.rf(2.5),
              fontWeight: weight,
              color: color || multiThemeColor().textcolor,
              fontFamily: fontFamily,
              paddingHorizontal: normalized.hp(3),
              marginLeft: marginLeft,
              marginTop: marginTop,
            }}>
            {text}
          </Text>
        </View>
      )}
    </>
  );
};
export default Heading;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
