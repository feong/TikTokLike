import AsyncStorage from '@react-native-community/async-storage';
import {iComment} from './dataType';

export const FAKE_COMMENT_KEY = 'FAKECOMMENTKEY';

export const postComment = async (videoId: number, message: string) => {
  try {
    const origin = await fetchOwnComments(videoId);

    const data = [
      {
        postId: videoId,
        id: Date.now(),
        name: 'TikTok Like',
        body: message,
        date: Date.now(),
      },
    ].concat(origin);
    await AsyncStorage.setItem(FAKE_COMMENT_KEY, JSON.stringify(data));
  } catch (e) {}
};

export const fetchOwnComments = async (videoId: number) => {
  try {
    const ret = await AsyncStorage.getItem(FAKE_COMMENT_KEY);
    if (ret === null) {
      return [];
    } else {
      const data = JSON.parse(ret) as iComment[];
      return data.filter((item) => item.postId === videoId);
    }
  } catch (e) {}
  return [];
};
