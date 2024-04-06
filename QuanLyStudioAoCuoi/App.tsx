import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './cpn/ScreenCPN/Login.tsx';
import SignUp from './cpn/ScreenCPN/SignUp.tsx';
import Welcome from './cpn/ScreenCPN/Welcome.tsx';
import TinTucScreen from './cpn/ScreenCPN/TinTucScreen.tsx';
import Home from './cpn/ScreenCPN/Home.tsx';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DetailService from './cpn/ScreenCPN/DetailService.tsx';
import ListUser from './cpn/CPNAdmin/ListUser.tsx';
import ServiceScreen from './cpn/ScreenCPN/ServiceScreen.tsx';
import IntroduceScreen from './cpn/ScreenCPN/IntroduceScreen.tsx';
import LogOut from './cpn/ScreenCPN/LogOut.tsx';
import OrderPhotoPrinting from './cpn/ScreenCPN/OrderPhotoPrinting.tsx';
import ScheduleAConsultation from './cpn/ScreenCPN/ScheduleAConsultation.tsx';
import NewsCRUD from './cpn/CPNAdmin/NewsCRUD.tsx';
import Addnews from './cpn/CPNAdmin/Addnews.tsx';
import Booking from './cpn/CPNAdmin/Booking.tsx';
import AddService from './cpn/CPNAdmin/AddService.tsx';
import ServiceCRUD from './cpn/CPNAdmin/ServiceCRUD.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={MyDrawer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Đăng nhập"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Đăng ký"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Tin Tức'}
          component={TinTucScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'DetailService'}
          component={DetailService}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Addnews'}
          component={Addnews}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'AddService'}
          component={AddService}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MyDrawer() {
  const [isAdmin, setIsAdmin] = useState(false);
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
      const response = await axios.get(
        `http://192.168.1.27:3000/getUser/${userId}`,
      );
      const userData = response.data;
      setIsAdmin(userData.type === 'admin');
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
  };
  return (
    <Drawer.Navigator initialRouteName={'Trang chủ'}>
      <Drawer.Screen name="Trang chủ" component={Home} />
      {isAdmin && (
        <>
          <Drawer.Screen name="CRUD tin tức" component={NewsCRUD} />
          <Drawer.Screen name="CRUD dịnh vụ" component={ServiceCRUD} />
          <Drawer.Screen name="Danh sách đặt lịch" component={Booking} />
          <Drawer.Screen name="ListUser" component={ListUser} />
        </>
      )}
      <Drawer.Screen name="Tin tức" component={TinTucScreen} />
      <Drawer.Screen name="Dịnh vụ" component={ServiceScreen} />
      <Drawer.Screen name="Đặt lịch tư vấn" component={ScheduleAConsultation} />
      <Drawer.Screen name="Đặt in ảnh" component={OrderPhotoPrinting} />
      <Drawer.Screen name="Giới thiệu" component={IntroduceScreen} />
      <Drawer.Screen name="Đăng xuất" component={LogOut} />
    </Drawer.Navigator>
  );
}

export default App;
