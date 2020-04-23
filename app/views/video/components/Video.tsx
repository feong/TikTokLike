import * as React from 'react';
import RNVideo from 'react-native-video';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Colors} from 'react-native-paper';

interface VideoProps {
  uri: string;
  paused?: boolean;
  onPausedChanged?: (paused: boolean) => void;
}

export const Video: React.FC<VideoProps> = (props) => {
  const {
    uri = 'https://cloud.video.taobao.com/play/u/516544213/p/2/e/6/t/1/250707633677.mp4',
    onPausedChanged,
  } = props;
  const [paused, setPaused] = React.useState(props.paused);

  React.useEffect(() => {
    setPaused(props.paused);
  }, [props.paused]);

  const onVideoPress = React.useCallback(() => {
    const nextState = !paused;
    setPaused(nextState);
    onPausedChanged && onPausedChanged(nextState);
  }, [onPausedChanged, paused]);

  return (
    <TouchableWithoutFeedback onPress={onVideoPress}>
      <RNVideo
        repeat
        paused={paused}
        source={{uri}}
        style={styles.backgroundVideo}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
