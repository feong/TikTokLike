import Animated, {Easing} from 'react-native-reanimated';

const {
  Clock,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  stopClock,
  block,
  call,
} = Animated;

/**
 * @param params.init initial value
 * @param params.dest destination value
 * @param params.duration default value is 2s
 * @param params.clock new clock will be created is not passed in
 * @param params.onFinished callback on animation finished
 */
export const runNumberTiming = (params: {
  init: number;
  dest: number;
  duration?: number;
  clock?: Animated.Clock;
  onFinished?: () => void;
}) => {
  const {
    init,
    dest,
    duration = 2000,
    clock = new Clock(),
    onFinished = () => {},
  } = params;
  const state = {
    finished: new Value(0),
    position: new Value(init),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration,
    toValue: new Value(dest),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // if the clock isn't running we start the clock
        startClock(clock),
      ],
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, [stopClock(clock), call([], onFinished)]),
    // we made the block return the updated position
    state.position,
  ]);
};
