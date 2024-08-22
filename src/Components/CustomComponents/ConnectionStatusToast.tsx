import {View, Modal, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Heading from './Heading';
import Button from './Button';
import NetInfo from '@react-native-community/netinfo';
import Space from './Space';
// import {MaterialIcons, multiThemeColor} from '../../Utils/AppConstants';
import SubHeading from './SubHeading';
import {MaterialIcons, multiThemeColor} from '../../Utils/AppConstant';
// import {MaterialIcons, multiThemeColor} from '../../../Utils/AppConstants';

const ConnectionStatusModal = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Initial check
    checkConnection();

    // Cleanup the event listener on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Modal
      visible={isConnected === false}
      transparent={true}
      animationType="fade">
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            {backgroundColor: multiThemeColor().main_background},
          ]}>
          {/* <MaterialIcons name="language" color="#aaa" size={100} /> */}
          <MaterialIcons name="signal-wifi-off" color="#ddd" size={100} />
          {/* <Heading text="Ooops!" color="#222" fontSize={25} weight={'bold'} /> */}
          <Heading
            text="Ooops!"
            color={multiThemeColor().PlaceHolder}
            fontSize={25}
            weight={'bold'}
          />
          <Space height={5} />
          <SubHeading
            text="No Internet Connection found"
            color="#ccc"
            fontSize={15}
          />
          <SubHeading text="Check Your Connection" color="#ccc" fontSize={14} />
          {/* <Heading text="No Internet Connection found" color="#ccc" />
          <Heading text="Check Your Connection" color="#ccc" /> */}
          <Space height={15} />
          <Button title="Try Again" onPress={checkConnection} width={'80%'} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    // backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default ConnectionStatusModal;
