import * as React from 'react';
import {Video} from './components/Video';
import {useNavigation} from '@react-navigation/native';

interface VideoTabProps {}

export const VideoTab: React.FC<VideoTabProps> = (props) => {
  const navigation = useNavigation();

  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    const unsubscribeForBlur = navigation.addListener('blur', () => {
      setPaused(true);
    });
    return unsubscribeForBlur;
  }, [navigation]);
  return <Video paused={paused} onPausedChanged={setPaused} />;
};
