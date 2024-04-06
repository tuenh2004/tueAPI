import React, {useEffect, useState} from 'react';

import {FlatList, RefreshControl, Text, View} from 'react-native';
import axios from 'axios';
const ListUser = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const featchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.27:3000/getListUsers');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    featchData();
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    // Thực hiện các thao tác cần thiết để làm mới dữ liệu
    await fetchData();
    setRefreshing(false);
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <Text>{item.id}</Text>
        <Text>{item.name}</Text>
        <Text>{item.email}</Text>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default ListUser;
