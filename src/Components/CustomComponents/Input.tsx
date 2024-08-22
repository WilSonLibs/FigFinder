import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  TextInputProps,
} from 'react-native';
import {
  AppColors,
  multiThemeColor,
  normalized,
  normalizedFont,
} from '../../utils/AppConstants';
import SubHeading from './SubHeading';
import Space from './Space';
import {Row} from 'native-base';
import Picture from './Picture';
// import { tick } from '../../assets';

interface UnderlinedInputProps extends TextInputProps {
  style?: any;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  text?: string;
  signUp?: boolean;
  rightText?: React.ReactNode;
  verified?: boolean;
  showVerified?: boolean;
  placeholder?: string;
  editable?: boolean;
}

const UnderlinedInput: React.FC<UnderlinedInputProps> = ({
  style,
  leftIcon,
  rightIcon,
  keyboardType,
  text,
  onChange,
  input,
  value,
  signUp,
  rightText,
  verified,
  showVerified,
  placeholder,
  editable,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [protect, setProtect] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => {}}>
      <Row>
        <SubHeading
          text={text}
          textAlign={'left'}
          color={multiThemeColor().dark_gray}
          marginLeft={signUp ? normalized.hp(2) : 0}
          fontWeight={'bold'}
        />
        {showVerified && (
          <Row style={styles.verified}>
            <Picture
              localSource={tick}
              height={normalized.hp('1.4%')}
              width={normalized.hp('1.4%')}
            />
            <SubHeading
              text={verified === true ? 'Verified' : 'Not verified'}
              textAlign={'center'}
              color={AppColors.primaryColor.darkWhite}
              marginLeft={normalized.hp(1)}
              fontWeight={'bold'}
              fontSize={normalizedFont.rf(1.3)}
            />
          </Row>
        )}
      </Row>
      {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
      <View style={[styles.container, style]}>
        <View style={{flex: 1}}>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            underlineColorAndroid="transparent"
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={input}
            placeholder={placeholder}
            keyboardType={keyboardType}
            editable={editable}
            // onChangeText={text => onChange(text)}
            secureTextEntry={protect ? true : false}
            {...props}
            placeholderTextColor={multiThemeColor().dark_gray}
          />
          {rightIcon && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setProtect(!protect)}>
              {rightIcon}
            </TouchableOpacity>
          )}
          {rightText && (
            <TouchableOpacity style={styles.textContainer}>
              {rightText}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: normalized.wp('92%'),
    alignSelf: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop:
      Platform.OS === 'android' ? normalized.hp(-1.5) : normalized.hp(0.8),
    paddingBottom:
      Platform.OS === 'android' ? normalized.wp(-1) : normalized.wp(1),
  },
  inputFocused: {
    borderBottomColor: 'blue', // Change to the desired color
  },
  iconContainer: {
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  leftIconContainer: {
    alignSelf: 'flex-start',
    position: 'absolute',
    bottom: normalized.wp(8),
    left: -10,
  },
  textContainer: {
    paddingHorizontal: normalized.wp(3),
    paddingVertical: normalized.wp(0.4),
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: normalized.wp(1.4),
    backgroundColor: AppColors.errorColor.red,
    borderRadius: 10,
  },
  verified: {
    backgroundColor: AppColors.primaryColor.mainContent,
    borderRadius: 10,
    marginHorizontal: normalized.wp(2),
    padding: normalized.wp(1),
    justifyContent: 'space-between',
  },
});

export default UnderlinedInput;
