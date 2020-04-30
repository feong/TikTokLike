import * as React from 'react';
import {View} from 'react-native';
import {StyleProp, ViewStyle} from 'react-native';
import {HeartAnimation} from './HeartAnimation';

interface HeartAnimationFullViewProps {
  points: {x: number; y: number; timestamp: number}[];
  style?: StyleProp<ViewStyle>;
}

export const HeartAnimationFullView = React.memo(
  (props: HeartAnimationFullViewProps) => {
    const {points, style} = props;

    return (
      <View style={style}>
        {points.map((item) => (
          <HeartAnimation
            key={item.timestamp}
            offsetX={item.x}
            offsetY={item.y}
          />
        ))}
      </View>
    );
  },
);
