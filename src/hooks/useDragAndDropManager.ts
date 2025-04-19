import { useRef } from 'react';
import usePuzzleStore from '../store/PuzzleStore';
import { runOnJS } from 'react-native-reanimated';

const useDragAndDropManager = () => {
	// Store the layout information of potential drop targets (empty cells)
	const dropTargets = useRef({});

	// Access store actions and state
	const dropNumberIntoCell = usePuzzleStore(
		(state) => state.dropNumberIntoCell,
	);
	const puzzleGrid = usePuzzleStore((state) => state.puzzleGrid);

	// Register a cell's layout as a drop target
	const registerDropTarget = (cellId, layout) => {
		dropTargets.current[cellId] = layout;
		// console.log("Registered drop target:", cellId, layout);
	};

	// Unregister a cell (optional, if cells can become non-droppable)
	const unregisterDropTarget = (cellId) => {
		delete dropTargets.current[cellId];
		// console.log("Unregistered drop target:", cellId);
	};

	// Callback when a drag starts (from DraggableNumber)
	const onDragStart = (number) => {
		// We could store which item is being dragged if needed
		// console.log(`Drag started for number ${number}`);
	};

	// Callback during drag (from DraggableNumber)
	const onDrag = ({ x, y, number }) => {
		// Can be used to provide visual feedback on potential drop targets
		// based on the current {x, y} position.
		// console.log(`Dragging ${number} at pageX:${x}, pageY:${y}`);
	};

	// Callback when a drag ends (from DraggableNumber)
	const onDragEnd = ({ x, y, number }, setFinalPosition) => {
		let targetCellLayout = null; // Layout of the successful drop target
		let targetCellId = null;

		// Check if the drop position ({x, y}) is within any registered drop target
		for (const cellId in dropTargets.current) {
			const target = dropTargets.current[cellId];
			// Find the corresponding cell data from the store state
			const cellData = puzzleGrid.find((cell) => cell.id === cellId);

			// Check if this cell is a valid drop target (exists, not fixed, is empty)
			if (cellData && !cellData.isFixed && cellData.value === null) {
				// Check if the drop coordinates are within the bounds of the target cell
				if (
					x >= target.x &&
					x <= target.x + target.width &&
					y >= target.y &&
					y <= target.y + target.height
				) {
					// Found a valid drop target
					targetCellLayout = target;
					targetCellId = cellId;
					break; // Stop checking after finding the first valid target
				}
			}
		}

		if (targetCellLayout && targetCellId) {
			// Successful drop
			console.log(
				`Attempting to drop number ${number} into cell ${targetCellId}`,
			);
			// Calculate the center page coordinates of the target cell
			const targetCenterX = targetCellLayout.x + targetCellLayout.width / 2;
			const targetCenterY = targetCellLayout.y + targetCellLayout.height / 2;

			// Tell the DraggableNumber component to animate to the target cell's center
			// Use runOnJS because this is called from a reanimated gesture handler thread
			runOnJS(setFinalPosition)({ pageX: targetCenterX, pageY: targetCenterY });

			// Update the Zustand store state after successful drop
			// Use runOnJS to call the store action on the UI thread
			runOnJS(dropNumberIntoCell)(targetCellId, number);
		} else {
			// Drop failed (not over a valid target)
			console.log(`Drop failed for number ${number}. No valid target found.`);
			// Tell the DraggableNumber component to return to its original position
			runOnJS(setFinalPosition)('reset');
			// Optional: provide visual/haptic feedback for a failed drop
		}
	};

	return {
		registerDropTarget,
		unregisterDropTarget, // Expose if needed
		onDragStart,
		onDrag,
		onDragEnd,
		// dropTargets: dropTargets.current // Expose for debugging
	};
};

export default useDragAndDropManager;
