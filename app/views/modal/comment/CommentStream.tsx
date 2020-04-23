import * as React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {CommentHeader} from './components/CommentHeader';
import {CommentList} from './components/CommentList';
import {CommentPost} from './components/CommentPost';

type ParamList = {
  CommentStream: {videoId: number};
};

interface CommentStreamProps {
  route: RouteProp<ParamList, 'CommentStream'>;
}

export const CommentStream: React.FC<CommentStreamProps> = (props) => {
  const navigation = useNavigation();
  const {videoId} = props.route.params;

  const [fetchTime, setFetchTime] = React.useState(Date.now());
  const [commentCount, setCommentCount] = React.useState<number>();
  const onPosted = React.useCallback(() => {
    setFetchTime(Date.now());
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={navigation.goBack}>
        <View style={styles.shadowPanel} />
      </TouchableWithoutFeedback>
      <View style={styles.commentPanel}>
        <CommentHeader
          title={
            commentCount === undefined ? 'comments' : `${commentCount} comments`
          }
        />
        <CommentList
          videoId={videoId}
          fetchTime={fetchTime}
          onFetched={setCommentCount}
        />
        <CommentPost videoId={videoId} onPosted={onPosted} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  shadowPanel: {
    height: '40%',
  },
  commentPanel: {
    flex: 1,
    // height: 800,
    backgroundColor: Colors.grey900,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
});
