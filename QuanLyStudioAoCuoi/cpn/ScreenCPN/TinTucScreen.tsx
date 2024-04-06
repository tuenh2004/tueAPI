import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const TinTucScreen = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.1.27:3000/getListNews');
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View>
        <Text>{item.name}</Text>
        <Text>{item.content}</Text>
        <Image source={{uri: item.image}} style={{width: 100, height: 100}} />
      </View>
    );
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
export default TinTucScreen;
const styles = StyleSheet.create({});
