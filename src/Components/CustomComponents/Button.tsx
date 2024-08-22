import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {multiThemeColor, normalized} from '../../Utils/AppConstant';
// import {multiThemeColor, normalized} from '../../Utils/AppConstants';
// import {multiThemeColor, normalized} from '../../utils/AppConstants';
// import {WHITE} from '../../styles/Colors';

interface ButtonProps {
  height?: number | string;
  width?: number | string;
  onPress: () => void;
  alignSelf?: ViewStyle['alignSelf'];
  style?: ViewStyle;
  title: string;
  backgroundColor?: string;
  absolute?: boolean;
  absoluteRed?: boolean;
  TextColor?: string;
  leftIcon?: React.ReactNode;
  fontWeight?: TextStyle['fontWeight'];
  txtmarginLeft?: number;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  height,
  width,
  onPress,
  alignSelf,
  style,
  title,
  backgroundColor,
  absolute,
  absoluteRed,
  TextColor,
  leftIcon,
  fontWeight,
  txtmarginLeft,
  disabled,
}) => {
  const buttonStyle: ViewStyle = {
    height: height || normalized.hp('5.2%'),
    width: width || normalized.wp('90%'),
    borderRadius: 4,
    alignSelf: alignSelf || 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: backgroundColor || 'red',
    ...(absolute || absoluteRed
      ? {position: 'absolute', bottom: absoluteRed ? normalized.hp(7) : 0}
      : {}),
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[style, buttonStyle]}
      onPress={onPress}>
      {leftIcon && <View style={styles.Button}>{leftIcon}</View>}
      <Text
        style={{
          color: TextColor || multiThemeColor().WHITE,
          fontWeight: fontWeight || 'bold',
          marginLeft: txtmarginLeft || 0,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  Button: {
    position: 'absolute',
    left: normalized.wp(2),
    marginLeft: 50,
    // marginRight: 10,
  },
});
