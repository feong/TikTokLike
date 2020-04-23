import * as React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
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
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={navigation.goBack}>
        <View style={styles.shadowPanel} />
      </TouchableWithoutFeedback>
      <View style={styles.commentPanel}>
        <CommentHeader title={'ABCD'} />
        <CommentList videoId={videoId} />
        <CommentPost videoId={videoId} />
      </View>
    </View>
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
    backgroundColor: Colors.grey900,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
});
