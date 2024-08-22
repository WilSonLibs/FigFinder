import React from 'react';
import {TouchableOpacity, GestureResponderEvent, ViewStyle} from 'react-native';
// import { LinearGradient, normalized } from '../../utils/AppConstants';
import Heading from './Heading';
import {LinearGradient, normalized} from '../../Utils/AppConstants';

interface GradientButtonProps {
  title: string;
  color: string;
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';
  onPress?: (event: GestureResponderEvent) => void;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  height?: string | number;
  width?: string | number;
  fontSize?: number;
  style?: ViewStyle;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  height,
  width,
  title,
  color,
  onPress,
  alignSelf = 'center',
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  fontSize,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#4976e8', '#26c4f5', '#4ce4fc']}
        style={{
          height:
            typeof height === 'string'
              ? parseInt(height, 10)
              : height || normalized.hp('5.2%'),
          width:
            typeof width === 'string'
              ? parseInt(width, 10)
              : width || normalized.wp('30%'),
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf,
          margin,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          ...style,
        }}>
        <Heading text={title} color={color} fontSize={fontSize} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
