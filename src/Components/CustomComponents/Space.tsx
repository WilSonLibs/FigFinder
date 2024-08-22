import React from 'react';
import { View, ViewStyle } from 'react-native';

interface SpaceProps {
  height?: number | string;
  width?: number | string;
}

const Space: React.FC<SpaceProps> = ({ height, width }) => {
  return <View style={{ height: height, width: width }} />;
};

export default Space;
