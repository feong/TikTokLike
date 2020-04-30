import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import {runNumberTiming} from 'app/utils/animation/runNumberTiming';
import {StyleProp, ViewStyle} from 'react-native';

const {Clock} = Animated;

interface HeartAnimationProps {
  style?: StyleProp<ViewStyle>;
}

const Heart = () => <Icon name="ios-heart" size={64} color={Colors.red700} />;

export const HeartAnimation = React.memo((props: HeartAnimationProps) => {
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
    <Animated.View style={[{opacity, transform: [{scale}]}, props.style]}>
      <Heart />
    </Animated.View>
  );
});
