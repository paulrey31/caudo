import { useCallback, useRef, useState } from 'react';

type CloseFn = () => void;

export default function useSwipeableListControl() {
	const openRowCloseFn = useRef<CloseFn | null>(null);
	const [isRowOpen, setIsRowOpen] = useState(false);

	const registerOpenRow = useCallback((closeFn: CloseFn) => {
		if (openRowCloseFn.current && openRowCloseFn.current !== closeFn) {
			openRowCloseFn.current();
		}
		openRowCloseFn.current = closeFn;
		setIsRowOpen(true);
	}, []);

	const closeOpenRow = useCallback(() => {
		if (openRowCloseFn.current) {
			openRowCloseFn.current();
			openRowCloseFn.current = null;
			setIsRowOpen(false);
		}
	}, []);

	return {
		registerOpenRow,
		closeOpenRow,
		isRowOpen, // 👈 pour savoir si un row est ouvert
	};
}
