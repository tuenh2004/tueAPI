import React, {useState, useEffect} from 'react';
import {View, Text, Button, Alert, TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScheduleAConsultation = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    getUserIdFromStorage();
  }, []);

  const getUserIdFromStorage = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId !== null) {
        console.log('Đã lấy _id từ AsyncStorage:', storedUserId);
        getUserInfo(storedUserId);
      }
    } catch (error) {
      console.error('Lỗi khi đọc _id từ AsyncStorage:', error);
    }
  };

  const getUserInfo = async userId => {
    try {
      // Gửi yêu cầu đến backend để lấy thông tin người dùng từ _id
      const response = await axios.get(
        `http://192.168.1.27:3000/getUser/${userId}`,
      );
      const userData = response.data;
      // Cập nhật state với thông tin người dùng đã lấy được
      setUserName(userData.name);
      setUserEmail(userData.email);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      // Gửi yêu cầu đặt lịch hẹn đến backend với _id, ngày hẹn, số điện thoại và nội dung
      await axios.post('http://192.168.1.27:3000/schedule', {
        userName,
        userEmail,
        date: date,
        phoneNumber,
        content,
      });

      // Hiển thị thông báo khi đặt lịch thành công
      Alert.alert('Thông báo', 'Đặt lịch hẹn thành công!');
    } catch (error) {
      console.error('Lỗi khi đặt lịch hẹn:', error);
      Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi đặt lịch hẹn.');
    }
  };

  return (
    <View>
      <Text>Đặt lịch hẹn</Text>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      {date && <Text>Ngày hẹn: {date.toLocaleString()}</Text>}
      <TextInput
        placeholder="Số điện thoại"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <TextInput
        placeholder="Nội dung"
        value={content}
        onChangeText={text => setContent(text)}
      />
      <Button title="Đặt lịch" onPress={handleSubmit} />
    </View>
  );
};

export default ScheduleAConsultation;
