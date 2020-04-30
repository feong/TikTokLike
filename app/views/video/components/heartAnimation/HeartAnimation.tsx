import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import {runNumberTiming} from 'app/utils/animation/runNumberTiming';

const HEART_ICON_SIZE = 64;

const {Clock} = Animated;

interface HeartAnimationProps {
  offsetX?: number;
  offsetY?: number;
}

const Heart = () => (
  <Icon name="ios-heart" size={HEART_ICON_SIZE} color={Colors.red700} />
);

export const HeartAnimation = React.memo((props: HeartAnimationProps) => {
  const {offsetX, offsetY} = props;
  const [finished, setFinished] = React.useState(false);

  if (finished) {
    return null;
  }

  // we create a clock node
  const clock = new Clock();
  const opacity = runNumberTiming({
    clock,
    init: 1,
    dest: 0,
    onFinished: () => {
      setFinished(true);
    },
  });
  const scale = runNumberTiming({clock, init: 0, dest: 2});
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: offsetY - HEART_ICON_SIZE / 2,
        left: offsetX - HEART_ICON_SIZE / 2,
        opacity,
        transform: [{scale}],
      }}>
      <Heart />
    </Animated.View>
  );
});
