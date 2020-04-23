import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors, IconButton, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

interface CommentHeaderProps {
  title: string;
}

export const CommentHeader: React.FC<CommentHeaderProps> = (props) => {
  const navigation = useNavigation();
  const {title} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{title}</Text>
      <IconButton
        style={styles.closeButton}
        icon="close"
        color={Colors.white}
        size={16}
        onPress={navigation.goBack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  titleStyle: {
    color: Colors.white,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
