// src/hooks/useSwipeableListRowManager.ts
import { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

/**
 * Props pour le hook useSwipeableListRowManager
 */
type Props = {
	/** Fonction appelée au début du swipe */
	onSwipeStart?: () => void;
	/** Fonction appelée à la fin du swipe */
	onSwipeEnd?: () => void;
	/** Fonction pour enregistrer la fonction de fermeture de la ligne */
	registerOpenRow: (fn: () => void) => void;
};

/**
 * Hook personnalisé pour gérer le comportement de swipe sur une ligne individuelle
 *
 * Ce hook permet de :
 * - Gérer les animations de swipe avec Animated
 * - Créer un PanResponder pour détecter les gestes de swipe
 * - Gérer l'ouverture et la fermeture de la ligne avec des animations fluides
 * - Limiter le swipe à une distance maximale
 *
 * @param {Props} props - Les propriétés du hook
 * @returns {Object} Un objet contenant les valeurs et fonctions pour gérer le swipe
 */
export default function useSwipeableListRowManager({
	onSwipeStart,
	onSwipeEnd,
	registerOpenRow,
}: Props) {
	// Valeur animée pour la translation horizontale
	const translateX = useRef(new Animated.Value(0)).current;

	// Référence pour suivre si la ligne est ouverte par swipe
	const swipedOpen = useRef(false);

	/**
	 * Ferme la ligne avec une animation de ressort
	 */
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

	/**
	 * Création du PanResponder pour gérer les gestes de swipe
	 */
	const panResponder = useRef(
		PanResponder.create({
			// Détermine si le PanResponder doit être activé (seuil de 10 pixels)
			onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 10,

			// Appelé quand le PanResponder est activé
			onPanResponderGrant: () => {
				registerOpenRow(closeRow); // Enregistre la fonction de fermeture
				onSwipeStart?.(); // Désactive le défilement de la liste
			},

			// Appelé pendant le mouvement
			onPanResponderMove: (_, gesture) => {
				if (gesture.dx < 0) {
					// Limite le swipe à -100 pixels (vers la gauche)
					translateX.setValue(Math.max(gesture.dx, -100));
				}
			},

			// Appelé quand le doigt est relâché
			onPanResponderRelease: (_, gesture) => {
				onSwipeEnd?.(); // Réactive le défilement de la liste

				// Si le swipe dépasse 100 pixels, ouvre complètement la ligne
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
					// Sinon, ferme la ligne
					closeRow();
				}
			},

			// Appelé quand le PanResponder est terminé (ex: swipe annulé)
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
