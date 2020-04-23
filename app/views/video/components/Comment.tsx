import * as React from 'react';
import {StyleSheet, View, StyleProp, ViewProps} from 'react-native';
import {Colors, IconButton, Text} from 'react-native-paper';

interface CommentProps {
  videoId: number;
  comment: number;
  style?: StyleProp<ViewProps>;
}

export const Comment: React.FC<CommentProps> = (props) => {
  const {videoId, comment, style} = props;

  return (
    <View style={[styles.container, style]}>
      <IconButton
        icon="chat-processing"
        color={Colors.white}
        size={40}
        onPress={() => console.log('A')}
      />
      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  comment: {
    color: Colors.white,
    position: 'relative',
    bottom: 16,
  },
});
