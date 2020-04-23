import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {iVideoStream} from 'app/utils/dataType';
import {Video} from './Video';
import {Comment} from './Comment';

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
      <Comment videoId={data.id} comment={data.comment} style={styles.social} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  social: {
    position: 'absolute',
    right: 16,
    bottom: 32,
  },
});
