import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const PlusButton = () => {
  const firstValue = useSharedValue(30);
  const secondValue = useSharedValue(30);
  const thirdValue = useSharedValue(30);
  const isOpen = useSharedValue(false);
  const progress = useDerivedValue(() =>
    isOpen.value ? withTiming(1) : withTiming(0),
  );
  const handlePress = () => {
    const config = {
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
      duration: 500,
    };
    if (isOpen.value) {
      firstValue.value = withTiming(30, config);
      secondValue.value = withDelay(50, withTiming(30, config));
      thirdValue.value = withDelay(100, withTiming(30, config));
    } else {
      firstValue.value = withDelay(200, withSpring(130));
      secondValue.value = withDelay(100, withSpring(210));
      thirdValue.value = withSpring(290); // Cập nhật giá trị của thirdValue
    }
    isOpen.value = !isOpen.value;
  };

  const firstIcon = useAnimatedStyle(() => {
    const scale = interpolate(
      firstValue.value,
      [30, 130],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {
      bottom: firstValue.value,
      transform: [{scale: scale}],
    };
  });
  const secondIcon = useAnimatedStyle(() => {
    const scale = interpolate(
      secondValue.value,
      [30, 130],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {
      bottom: secondValue.value,
      transform: [{scale: scale}],
    };
  });

  const thirdIcon = useAnimatedStyle(() => {
    const scale = interpolate(
      thirdValue.value,
      [30, 130],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {
      bottom: thirdValue.value,
      transform: [{scale: scale}],
    };
  });
  const plusIcon = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${progress.value * 45}deg`}],
    };
  });
  return (
    <View>
      <Animated.View style={[styles.ContenContainer, thirdIcon]}>
        <View style={styles.IconContainer}>
          <Image
            source={require('../../assets/document.png')}
            style={styles.icon}
          />
        </View>
      </Animated.View>
      <Animated.View style={[styles.ContenContainer, secondIcon]}>
        <View style={styles.IconContainer}>
          <Image source={require('../../assets/pen.png')} style={styles.icon} />
        </View>
      </Animated.View>
      <Animated.View style={[styles.ContenContainer, firstIcon]}>
        <View style={styles.IconContainer}>
          <Image source={require('../../assets/folder.png')} style={styles.icon} />
        </View>
      </Animated.View>
      <Pressable style={styles.ContenContainer} onPress={() => handlePress()}>
        <Animated.View style={[styles.IconContainer, plusIcon]}>
          <Image source={require('../../assets/plus.png')} style={styles.icon} />
        </Animated.View>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  ContenContainer: {
    backgroundColor: '#0F56B3',
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 50,
  },
  IconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
});
export default PlusButton;
