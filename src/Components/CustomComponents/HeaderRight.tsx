import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Picture from './Picture';
import {chat} from '../../assets';
import {normalized} from '../../utils/AppConstants';

interface HeaderRightProps {
  onPress: () => void;
}

const HeaderRight: React.FC<HeaderRightProps> = ({onPress}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Picture
          localSource={chat}
          height={normalized.hp('2.4%')}
          width={normalized.hp('2.4%')}
          marginRight={normalized.wp(3)}
        />
      </TouchableOpacity>
    </>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({});
