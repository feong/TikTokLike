import * as React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Colors} from 'react-native-paper';
import {fetchComments} from 'app/utils/fetchComments';
import {iComment} from 'app/utils/dataType';
import {CommentItem} from './CommentItem';

interface CommentListProps {
  videoId: number;
}

export const CommentList: React.FC<CommentListProps> = (props) => {
  const {videoId} = props;
  const [comments, setComments] = React.useState<iComment[]>([]);

  React.useEffect(() => {
    let didCancel = false;
    const fetch = async () => {
      try {
        const ret = await fetchComments({videoId});
        !didCancel && setComments(ret);
      } catch (error) {}
    };
    fetch();

    return () => {
      didCancel = true;
    };
  }, [videoId]);

  console.log({comments});

  return (
    <FlatList
      data={comments}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({item}) => <CommentItem data={item} />}
    />
  );
};
