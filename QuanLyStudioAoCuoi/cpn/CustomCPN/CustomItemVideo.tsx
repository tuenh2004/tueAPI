import React, {useCallback, useState} from 'react';

import {Alert, Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';

const CustomItemVideo = ({item}) => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const navigation = useNavigation();
  return (
    <View>
      <YoutubePlayer
        height={200}
        width={300}
        videoId={item.link}
        play={playing}
        onChangeState={onStateChange}
      />
      <Text>{item.name}</Text>
    </View>
  );
};

export default CustomItemVideo;
