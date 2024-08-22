import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
// import { MaterialIcons, normalized } from "../../utils/AppConstants";
import Space from './Space';
// import {View} from 'native-base';
import Heading from './Heading';
import {useRoute} from '@react-navigation/native';
// import {useStackNavigator} from '../../Navigation/HandleNavigation/HandleNavigation';
// import {MaterialIcons, normalized} from '../../Utils/AppConstants';
import {useStackNavigator} from '../../Navigation/HandleNavigation/HandleNavigation';
import {MaterialIcons, normalized} from '../../Utils/AppConstant';
// import { useStackNavigator } from "../../utils/HandleNavigation";

interface HeaderLeftProps {
  onPress: () => void;
}

const HeaderLeft: React.FC<HeaderLeftProps> = ({onPress}) => {
  const {navigate} = useStackNavigator();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={{marginTop: 5}}>
        <MaterialIcons name={'dehaze'} size={25} color={'white'} />
      </TouchableOpacity>
      <Space width={normalized.wp('7%')} />
      <TouchableOpacity onPress={() => navigate('Home')}>
        <Heading
          text={'FigFinder'}
          color={'white'}
          weight={700}
          fontSize={20}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalized.hp(2),
    marginLeft: normalized.wp(2),
    alignContent: 'center',
    alignSelf: 'center',
  },
});
