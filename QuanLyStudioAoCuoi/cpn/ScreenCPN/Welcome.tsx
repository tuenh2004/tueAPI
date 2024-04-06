import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Button,
} from 'react-native';
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const DURATION = 1000;
const DELAY = 500;

const text = ['Welcome to', 'Studio', 'Ao Cuoi'];

function Welcome(props) {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Đăng nhập');
    }, 3000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      show();
    }, 500);
  }, []);

  const [isShown, setShown] = useState(false);

  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);

  // prettier-ignore
  const show = () => {
        if (isShown) {
            opacity3.value = withDelay(0 * DELAY, withTiming(0, { duration: DURATION }));
            opacity2.value = withDelay(1 * DELAY, withTiming(0, { duration: DURATION }));
            opacity1.value = withDelay(2 * DELAY, withTiming(0, { duration: DURATION }));
        } else {
            opacity1.value = withDelay(0 * DELAY, withTiming(1, { duration: DURATION }));
            opacity2.value = withDelay(1 * DELAY, withTiming(1, { duration: DURATION }));
            opacity3.value = withDelay(2 * DELAY, withTiming(1, { duration: DURATION }));
        }

        setShown(!isShown);
    };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/img/bgr4.jpg')}
        style={{flex: 3}}
        resizeMode="stretch"></ImageBackground>
      <View style={styles.container}>
        <View>
          <Animated.Text
            style={{...styles.label2, opacity: opacity1, color: 'blue'}}>
            {text[0]}
          </Animated.Text>
          <View style={styles.text}>
            <Animated.Text
              style={{...styles.label, opacity: opacity2, color: 'red'}}>
              {text[1]}
            </Animated.Text>
            <Animated.Text
              style={{...styles.label, opacity: opacity3, color: 'red'}}>
              {text[2]}
            </Animated.Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    marginTop: 50,
    marginLeft: 10,
  },
  text: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontSize: 42,
    fontWeight: 'bold',
    marginRight: 8,
  },
  label2: {
    fontSize: 38,
    fontWeight: 'bold',
    marginRight: 8,
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  animatedBorder: {
    height: 8,
    width: 64,
    backgroundColor: 'tomato',
    borderRadius: 20,
  },
});
