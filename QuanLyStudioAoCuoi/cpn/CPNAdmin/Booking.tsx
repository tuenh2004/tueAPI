import React, {useEffect, useState} from 'react';

import {FlatList, Text, View} from 'react-native';
import axios from 'axios';
const Booking = () => {
  const [data, setData] = useState([]);
  const featchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.27:3000/getSchedule');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    featchData();
  }, []);
  const renderItem = ({item}) => {
    return (
      <View>
        <Text>id: {item._id}</Text>
        <Text>ngày hẹn:{item.date}</Text>
        <Text>Sđt:{item.phoneNumber}</Text>
        <Text>Nội dung:{item.content}</Text>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Booking;
