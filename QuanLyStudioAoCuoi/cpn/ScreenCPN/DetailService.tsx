import React from 'react';

import {Text, View} from 'react-native';

const DetailService = ({ route }) => {
    const item = route.params.item;
    return (
        <Text>
            {item.name}
        </Text>
    );
};
export default DetailService;
