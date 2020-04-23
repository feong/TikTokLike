import * as React from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewProps,
  TouchableWithoutFeedback,
} from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {CommentHeader} from './components/CommentHeader';
import {CommentList} from './components/CommentList';

interface CommentStreamProps {
  videoId: number;
  style?: StyleProp<ViewProps>;
}

export const CommentStream: React.FC<CommentStreamProps> = (props) => {
  const navigation = useNavigation();
  const {videoId} = props;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={navigation.goBack}>
        <View style={styles.shadowPanel} />
      </TouchableWithoutFeedback>
      <View style={styles.commentPanel}>
        <CommentHeader title={'ABCD'} />
        <CommentList videoId={videoId} />
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
    backgroundColor: Colors.black,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
});
