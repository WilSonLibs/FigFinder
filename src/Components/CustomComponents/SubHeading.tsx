import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {multiThemeColor, normalizedFont} from '../../Utils/AppConstant';
// import {multiThemeColor, normalizedFont} from '../../Utils/AppConstants';
// import {multiThemeColor, normalizedFont} from '../../utils/AppConstants';

interface SubHeadingProps {
  text: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  color?: string;
  marginLeft?: number;
  marginRight?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  fontSize?: number;
  fontFamily?: string;
  marginTop?: number;
  marginBottom?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  onPress?: () => void;
  style?: TextStyle;
}

const SubHeading: React.FC<SubHeadingProps> = ({
  text,
  textAlign,
  color,
  marginLeft,
  marginRight,
  fontWeight,
  fontSize,
  fontFamily,
  marginTop,
  marginBottom,
  marginVertical,
  marginHorizontal,
  style,
  onPress,
}) => {
  return (
    <Text
      onPress={onPress}
      style={{
        textAlign: textAlign || 'left',
        fontSize: fontSize || normalizedFont.rf(1.8),
        color: color || multiThemeColor().textcolor,
        marginLeft: marginLeft,
        marginRight: marginRight,
        fontWeight: fontWeight as TextStyle['fontWeight'],
        fontFamily: fontFamily,
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginVertical: marginVertical,
        marginHorizontal: marginHorizontal,
        ...style,
      }}>
      {text}
    </Text>
  );
};

export default SubHeading;

const styles = StyleSheet.create({});
