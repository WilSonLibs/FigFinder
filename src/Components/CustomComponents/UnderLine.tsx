import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { multiThemeColor, normalized } from "../../utils/AppConstants";

interface UnderLineProps {
  width?: number | string;
  height?: number | string;
  color?: string;
}

const UnderLine: React.FC<UnderLineProps> = ({ width, height, color }) => {
  return (
    <View
      style={[
        styles.underLine,
        {
          width: normalized.wp(`${width}%`) || normalized.wp("85%"),
          height: normalized.hp(`${height}%`) || normalized.hp("1%"),
          backgroundColor: color || "gray",
        },
      ]}
    />
  );
};

export default UnderLine;

const styles = StyleSheet.create({
  underLine: {
    alignSelf: "center",
  },
});
