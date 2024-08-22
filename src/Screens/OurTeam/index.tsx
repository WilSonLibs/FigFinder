import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Picture from '../../Components/CustomComponents/Picture';
import {FigFinder, ProfileImage} from '../../Assets';
import {normalized} from '../../Utils/AppConstant';
import Heading from '../../Components/CustomComponents/Heading';
import Space from '../../Components/CustomComponents/Space';

const OurTeam = () => {
  const meetOurTeam = [1, 2, 3, 4, 5, 6];
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 10,
      }}>
      {meetOurTeam.map((item, ind) => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'black',
            padding: 10,
            borderRadius: 10,
            margin: 10,
          }}>
          <Picture
            localSource={ProfileImage}
            height={normalized.hp('15%')}
            width={normalized.hp('15%')}
            resizeMode="contain"
            roundCorner={100}
          />
          <Heading text="Wilson Hil" fontSize={16} weight={'bold'} />
          <Heading text="ML/AI Engineer" fontSize={16} weight={'bold'} />
          <Heading text="(From: India)" fontSize={16} weight={'bold'} />
        </View>
      ))}
      <Space height={20} />
    </ScrollView>
  );
};

export default OurTeam;

const styles = StyleSheet.create({});
