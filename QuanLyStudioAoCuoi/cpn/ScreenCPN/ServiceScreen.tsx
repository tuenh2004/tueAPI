import React, {useEffect, useState} from 'react';

import {
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import CustomItemService from '../CustomCPN/CustomItemService.tsx';

const ServiceScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://192.168.1.27:3000/getListService',
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({item}) => {
    return <CustomItemService item={item} />;
  };
  const handleDetail = item => {
    navigation.navigate('DetailService', {item});
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ServiceScreen;
