import React, { ReactNode } from 'react';
import { ViewStyle, TouchableOpacity, StyleSheet } from 'react-native';

interface CircularBorderProps {
    children: ReactNode;
    onPress?: () => void;
    width?: number;
    b_color?: string;
    b_width?: number;
    style?: ViewStyle;
    color?: string;
}

const CircularBorder: React.FC<CircularBorderProps> = ({
    children,
    onPress,
    width = 45,
    b_color = 'black',
    b_width = 1,
    style,
    color
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.circular,
                {
                    width: width,
                    height: width,
                    borderRadius: width / 2,
                    borderColor: b_color || color,
                    borderWidth: b_width,
                    ...style
                }
            ]}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    circular: {
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CircularBorder;
