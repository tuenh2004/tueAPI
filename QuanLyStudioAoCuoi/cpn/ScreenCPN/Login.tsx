import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [rmb, setRmb] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkLoggedIn = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const userId = await AsyncStorage.getItem('userId');
      if (isLoggedIn === 'true' && userId) {
        navigation.navigate('Home', {userId});
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Perform user authentication here
      const response = await fetch('http://172.20.10.4:3000/getListUsers');
      const userList = await response.json();
      const user = userList.find(
        user => user.email === email && user.password === password,
      );
      if (user) {
        const userId = user._id; // Lấy ID của người dùng
        if (rmb) {
          await AsyncStorage.setItem('userId', userId);
        } else {
          await AsyncStorage.removeItem('userId');
        }
        if (rmb) {
          await AsyncStorage.setItem('isLoggedIn', 'true');
        } else {
          await AsyncStorage.removeItem('isLoggedIn');
        }

        navigation.navigate('Home', {userId});
        ToastAndroid.show('Login successful', ToastAndroid.SHORT);
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{height: '100%'}}>
      <ImageBackground
        source={require('../../assets/img/bgr1.jpg')}
        style={{width: '100%', height: 350}}></ImageBackground>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          height: '69%',
          position: 'absolute',
          width: '100%',
          marginTop: 260,
        }}>
        <Text
          style={{
            fontSize: 30,
            marginTop: 30,
            textAlign: 'center',
            color: 'black',
          }}>
          Login to continue
        </Text>

        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            borderWidth: 1,
            padding: 2,
            borderRadius: 10,
            margin: 10,
            height: 60,
            justifyContent: 'space-around',
            marginTop: 30,
            borderColor: '#7fffd4',
          }}>
          <Icon
            style={{width: 30, marginLeft: 10}}
            name={'mail'}
            size={25}
            color={'black'}></Icon>

          <Text
            style={{
              fontSize: 35,
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 5,
            }}>
            |
          </Text>
          <TextInput
            onChangeText={txt => setEmail(txt)}
            style={{width: '75%'}}
            placeholder="Enter your email"
          />
          <TouchableOpacity>
            <Icon
              style={{width: 30, marginRight: 5}}
              name={'close-circle-outline'}
              size={25}
              color={'black'}></Icon>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            borderWidth: 1,
            padding: 2,
            borderRadius: 10,
            margin: 10,
            height: 60,
            justifyContent: 'space-around',
            marginTop: 15,
            borderColor: '#7fffd4',
          }}>
          <Icon
            style={{width: 30, marginLeft: 10}}
            name={'lock-closed'}
            size={25}
            color={'black'}></Icon>
          <Text
            style={{
              fontSize: 35,
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 5,
            }}>
            |
          </Text>
          <TextInput
            onChangeText={txt => setPassword(txt)}
            style={{width: '75%'}}
            placeholder="Enter your password"
          />
          <TouchableOpacity>
            <Icon
              style={{width: 30, marginRight: 5}}
              name={'eye-outline'}
              size={25}
              color={'black'}></Icon>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <TouchableOpacity onPress={() => setRmb(!rmb)}>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 2,
                  backgroundColor: rmb ? 'blue' : 'white',
                  height: 20,
                  width: 20,
                  marginLeft: 12,
                  borderColor: 'black',
                  marginTop: 2,
                }}></View>
            </TouchableOpacity>
            <Text style={{marginLeft: 5, fontSize: 16}}>Remember me</Text>
          </View>

          <View>
            <TouchableOpacity>
              <Text style={{marginLeft: 135, fontSize: 16, color: 'red'}}>
                Fogot password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: 'orange',
            borderRadius: 10,
            marginTop: 40,
            margin: 10,
            height: 60,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: 'white',
              marginTop: 15,
            }}>
            Login
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text style={{fontSize: 16}}>Don't have account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Đăng ký')}>
            <Text style={{fontSize: 16, marginLeft: 5, color: 'red'}}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View
            style={{
              height: 1,
              width: '40%',
              backgroundColor: 'black',
              marginLeft: 10,
              marginTop: 30,
            }}></View>
          <Text style={{fontSize: 16, marginTop: 20}}>or</Text>
          <View
            style={{
              height: 1,
              width: '40%',
              backgroundColor: 'black',
              marginRight: 10,
              marginTop: 30,
            }}></View>
        </View>

        <TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 30,
            }}>
            <Text style={{fontSize: 16}}>Login with socials</Text>
            <Icon
              style={{width: 30, marginLeft: 5, marginTop: 1}}
              name={'arrow-forward'}
              size={20}
              color={'black'}></Icon>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
