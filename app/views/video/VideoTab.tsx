import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {fetchVideoStream} from 'app/utils/fetchVideoStream';
import {PagingList} from '../components/PagingList';
import {VideoSocials} from './components/VideoSocials';

interface VideoTabProps {}

export const VideoTab: React.FC<VideoTabProps> = () => {
  const navigation = useNavigation();

  const [paused, setPaused] = React.useState(false);
  const [pageIndex, setPageIndex] = React.useState(0);

  React.useEffect(() => {
    const unsubscribeForBlur = navigation.addListener('blur', () => {
      setPaused(true);
    });
    return unsubscribeForBlur;
  }, [navigation]);

  return (
    <PagingList
      query={fetchVideoStream}
      renderItem={({item, index}) => {
        return (
          <VideoSocials
            data={item}
            paused={paused || pageIndex !== index}
            onPausedChanged={setPaused}
          />
        );
      }}
      onPageIndexChanged={(index) => {
        setPageIndex(index);
        setPaused(false);
      }}
    />
  );
};
