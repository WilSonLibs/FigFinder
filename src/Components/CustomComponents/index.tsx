import React, {ReactNode} from 'react';
import * as Animatable from 'react-native-animatable';
import {ViewStyle} from 'react-native';

interface AnimatedContainerProps {
  animationType: string;
  isVisible: boolean;
  children: ReactNode;
  delay?: number;
  duration?: number;
  style?: ViewStyle;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  animationType,
  isVisible,
  children,
  delay = 0,
  duration = 1000,
  style,
}) => {
  return (
    <Animatable.View
      style={style}
      animation={isVisible ? animationType : undefined}
      duration={duration}
      useNativeDriver
      delay={delay}>
      {children}
    </Animatable.View>
  );
};

export default AnimatedContainer;
