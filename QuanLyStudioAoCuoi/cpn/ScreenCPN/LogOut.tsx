// LogOut.tsx
import React from 'react';
import {View, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogOut = ({navigation}) => {
  const handleLogOut = async () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          onPress: async () => {
            await AsyncStorage.removeItem('isLoggedIn');
            await AsyncStorage.removeItem('userId');
            navigation.navigate('Đăng nhập');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Log Out" onPress={handleLogOut} />
    </View>
  );
};

export default LogOut;
