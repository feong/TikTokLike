import * as React from 'react';
import {FlatList} from 'react-native';
import {fetchComments} from 'app/utils/fetchComments';
import {iComment} from 'app/utils/dataType';
import {CommentItem} from './CommentItem';

interface CommentListProps {
  videoId: number;
  fetchTime: number;
  onFetched: (count: number) => void;
}

export const CommentList: React.FC<CommentListProps> = (props) => {
  const {videoId, fetchTime, onFetched} = props;
  const [comments, setComments] = React.useState<iComment[]>([]);

  React.useEffect(() => {
    let didCancel = false;
    const fetch = async () => {
      try {
        const ret = await fetchComments({videoId});
        !didCancel && setComments(ret);
        onFetched(ret.length);
      } catch (error) {}
    };
    fetch();

    return () => {
      didCancel = true;
    };
  }, [videoId, fetchTime, onFetched]);

  return (
    <FlatList
      data={comments}
      keyExtractor={(item) => `${item.id}`}
      extraData={fetchTime}
      renderItem={({item}) => <CommentItem data={item} />}
    />
  );
};
