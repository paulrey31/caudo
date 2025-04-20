// src/hooks/useSwipeableListRowManager.ts
import { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

type Props = {
	onSwipeStart?: () => void;
	onSwipeEnd?: () => void;
	registerOpenRow: (fn: () => void) => void;
};

export default function useSwipeableListRowManager({
	onSwipeStart,
	onSwipeEnd,
	registerOpenRow,
}: Props) {
	const translateX = useRef(new Animated.Value(0)).current;
	const swipedOpen = useRef(false);

	const closeRow = () => {
		Animated.spring(translateX, {
			toValue: 0,
			useNativeDriver: true,
			friction: 6,
		}).start(() => {
			translateX.flattenOffset();
			swipedOpen.current = false;
		});
	};

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 10,

			onPanResponderGrant: () => {
				registerOpenRow(closeRow); // signale qu’on ouvre ce row
				onSwipeStart?.(); // désactive scroll
			},

			onPanResponderMove: (_, gesture) => {
				if (gesture.dx < 0) {
					translateX.setValue(Math.max(gesture.dx, -100)); // limite swipe gauche
				}
			},

			onPanResponderRelease: (_, gesture) => {
				onSwipeEnd?.(); // réactive scroll

				if (gesture.dx < -100) {
					Animated.spring(translateX, {
						toValue: -100,
						useNativeDriver: true,
						friction: 8,
					}).start(() => {
						translateX.flattenOffset();
						swipedOpen.current = true;
					});
				} else {
					closeRow();
				}
			},

			onPanResponderTerminate: () => {
				onSwipeEnd?.();
				closeRow();
			},
		}),
	).current;

	return {
		translateX,
		panResponder,
		closeRow,
	};
}
