import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {iVideoStream} from 'app/utils/dataType';
import {Video} from './Video';

interface VideoSocialsProps {
  data: iVideoStream;
  paused: boolean;
  onPausedChanged: (paused: boolean) => void;
}

export const VideoSocials: React.FC<VideoSocialsProps> = (props) => {
  const {data, paused, onPausedChanged} = props;
  return (
    <View style={styles.container}>
      <Video uri={data.uri} paused={paused} onPausedChanged={onPausedChanged} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
