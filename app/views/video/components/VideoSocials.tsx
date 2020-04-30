import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {iVideoStream, iPointStamp, iPoint} from 'app/utils/dataType';
import {Video} from './Video';
import {Comment} from './Comment';
import {HeartAnimationFullView} from './heartAnimation';

interface VideoSocialsProps {
  data: iVideoStream;
  paused: boolean;
  onPausedChanged: (paused: boolean) => void;
}

export const VideoSocials: React.FC<VideoSocialsProps> = (props) => {
  const [points, setPoints] = React.useState<iPointStamp[]>([]);
  const {data, paused, onPausedChanged} = props;

  const onVideoDoubleTap = React.useCallback((point: iPoint) => {
    setPoints((pre) =>
      pre.concat(Object.assign({timestamp: Date.now()}, point)),
    );
  }, []);

  return (
    <View style={styles.container}>
      <Video
        uri={data.uri}
        paused={paused}
        onPausedChanged={onPausedChanged}
        onDoubleTap={onVideoDoubleTap}
      />
      <Comment videoId={data.id} comment={data.comment} style={styles.social} />
      <HeartAnimationFullView style={styles.heart} points={points} />
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
  heart: {
    position: 'absolute',
  },
});
