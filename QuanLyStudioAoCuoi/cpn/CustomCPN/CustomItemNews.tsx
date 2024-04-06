import React from 'react';

import {Button, Image, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const CustomItemNews = ({item}) => {
  const navigation = useNavigation();
  const handleDetail = item => {
    navigation.navigate('DetailService', {item});
  };
  return (
    <View>
      <Image source={{uri: item.image}} style={{width: 50, height: 50}} />
      <Text>{item.name}</Text>
      <Button title="Chi tiết" onPress={() => handleDetail(item)} />
    </View>
  );
};

export default CustomItemNews;
