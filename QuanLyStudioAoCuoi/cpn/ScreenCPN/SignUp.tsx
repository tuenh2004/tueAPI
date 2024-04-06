import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const SignUp = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = password => {
    return password.length >= 6;
  };

  const validateData = () => {
    if (!name || !email || !password || !confirmPassword) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return false;
    }

    if (!isValidEmail(email)) {
      ToastAndroid.show('Invalid email address', ToastAndroid.SHORT);
      return false;
    }

    if (!isValidPassword(password)) {
      ToastAndroid.show(
        'Password must be at least 6 characters long',
        ToastAndroid.SHORT,
      );
      return false;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateData()) {
      return;
    }
    try {
      const signUpResponse = await axios.post(
        'http://192.168.1.27:3000/createUser',
        {
          name,
          email,
          password,
        },
      );

      console.log('Response:', signUpResponse.data);
      ToastAndroid.show('Sign up successful', ToastAndroid.SHORT);
      // Xử lý phản hồi từ server (ví dụ: hiển thị thông báo)
      props.navigation.navigate('Đăng nhập');
    } catch (error) {
      console.error('Error:', error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/img/bgr3.jpg')}
        style={styles.backgroundImage}></ImageBackground>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <Icon style={styles.icon} name={'people'} size={25} color={'black'} />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity>
            <Icon
              style={styles.icon}
              name={'close-circle-outline'}
              size={25}
              color={'black'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Icon style={styles.icon} name={'mail'} size={25} color={'black'} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity>
            <Icon
              style={styles.icon}
              name={'close-circle-outline'}
              size={25}
              color={'black'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Icon
            style={styles.icon}
            name={'lock-closed'}
            size={25}
            color={'black'}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity>
            <Icon
              style={styles.icon}
              name={'eye-outline'}
              size={25}
              color={'black'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Icon
            style={styles.icon}
            name={'lock-closed'}
            size={25}
            color={'black'}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter re your password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity>
            <Icon
              style={styles.icon}
              name={'eye-outline'}
              size={25}
              color={'black'}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Đăng nhập')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: 350,
  },
  formContainer: {
    position: 'absolute',
    height: 570,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 250,
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
  inputContainer: {
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
  },
  icon: {
    width: 30,
    marginLeft: 10,
  },
  input: {
    width: '75%',
  },
  registerButton: {
    backgroundColor: 'orange',
    borderRadius: 10,
    marginTop: 20,
    margin: 10,
    height: 60,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  loginTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  loginText: {
    textAlign: 'center',
  },
  loginLink: {
    marginLeft: 5,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default SignUp;
