import React from 'react';

import {Button, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
const CustomItemAlbum = ({item}) => {
    const navigation = useNavigation();
    const handleDetail = item => {
        navigation.navigate('DetailService', { item });
    };
    return (
        <View>
            {/*<Image source={{ uri: item.image }} style={styles.image} />*/}
            <Text>{item.name}</Text>
            <Button title="Chi tiết" onPress={() => handleDetail(item)} />
        </View>
    );
};

export default CustomItemAlbum;
