import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors, Text, Avatar, Caption} from 'react-native-paper';
import {iComment} from 'app/utils/dataType';
import moment from 'moment';

interface CommentItemProps {
  data: iComment;
}

export const CommentItem: React.FC<CommentItemProps> = (props) => {
  const {data} = props;

  return (
    <View style={styles.container}>
      <Avatar.Text size={32} label={data.name.substring(0, 2)} />
      <View style={styles.textContainer}>
        <Caption style={styles.authorStyle} numberOfLines={1}>
          {data.name}
        </Caption>
        <Text style={styles.bodyStyle}>{data.body}</Text>
        <Caption style={styles.authorStyle} numberOfLines={1}>
          {moment(data.date).format('YYYY/MM/DD HH:mm')}
        </Caption>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
    paddingRight: 8,
  },
  authorStyle: {
    flex: 1,
    color: Colors.grey100,
  },
  bodyStyle: {
    color: Colors.white,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
