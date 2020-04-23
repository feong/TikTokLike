import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from 'react-native';
import {Colors, IconButton} from 'react-native-paper';
import {postComment} from 'app/utils/postComment';

const INITIAL_TEXT = 'Text some, make some popular';

interface CommentPostProps {
  videoId: number;
  onPosted: () => void;
}

export const CommentPost: React.FC<CommentPostProps> = (props) => {
  const {videoId, onPosted} = props;
  const [text, setText] = React.useState('');

  return (
    <TouchableWithoutFeedback>
      <KeyboardAvoidingView behavior="padding">
        <SafeAreaView style={styles.container}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={styles.text}
            placeholder={INITIAL_TEXT}
            placeholderTextColor={Colors.grey100}
            onFocus={() => setText('')}
            onBlur={() => setText(INITIAL_TEXT)}
          />
          <IconButton
            icon="arrow-left-bold-circle"
            size={32}
            color={Colors.blue500}
            onPress={async () => {
              if (text) {
                await postComment(videoId, text);
                Keyboard.dismiss();
                onPosted();
              }
            }}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: Colors.black,
  },
  text: {
    flex: 1,
    color: Colors.grey100,
    marginLeft: 16,
  },
});
