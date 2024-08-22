import React from 'react';
import {StyleSheet, View} from 'react-native';
import Picture from './Picture';
// import {NavImage2} from '../../assets';
// import { normalized } from '../../utils/AppConstants';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {normalized} from '../../Utils/AppConstant';
import {FigFinder, Splash_image} from '../../Assets';
// import {normalized} from '../../Utils/AppConstants';
// import {NavImage2} from '../../Assets';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  return (
    <DrawerContentScrollView {...props} style={styles.imageResize}>
      <Picture
        localSource={FigFinder}
        height={normalized.wp('50%')}
        width={normalized.wp('70%')}
        // resizeMode="repeat"
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  itemList: {alignItems: 'flex-start', justifyContent: 'center'},
  imageResize: {marginTop: -4},
});
