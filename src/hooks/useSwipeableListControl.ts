import { useCallback, useRef, useState } from 'react';

/**
 * Type pour la fonction de fermeture d'une ligne
 */
type CloseFn = () => void;

/**
 * Hook personnalisé pour gérer le comportement de swipe sur les lignes d'une liste
 *
 * Ce hook permet de :
 * - Gérer l'ouverture et la fermeture des lignes swipables
 * - S'assurer qu'une seule ligne est ouverte à la fois
 * - Fournir un état pour savoir si une ligne est ouverte
 *
 * @returns {Object} Un objet contenant les fonctions et l'état pour gérer les lignes swipables
 */
export default function useSwipeableListControl() {
	// Référence à la fonction de fermeture de la ligne actuellement ouverte
	const openRowCloseFn = useRef<CloseFn | null>(null);

	// État indiquant si une ligne est ouverte
	const [isRowOpen, setIsRowOpen] = useState(false);

	/**
	 * Enregistre une nouvelle ligne ouverte et ferme la précédente si nécessaire
	 *
	 * @param {CloseFn} closeFn - Fonction pour fermer la ligne
	 */
	const registerOpenRow = useCallback((closeFn: CloseFn) => {
		// Si une ligne est déjà ouverte et que ce n'est pas la même, on la ferme
		if (openRowCloseFn.current && openRowCloseFn.current !== closeFn) {
			openRowCloseFn.current();
		}

		// On enregistre la nouvelle fonction de fermeture
		openRowCloseFn.current = closeFn;

		// On met à jour l'état pour indiquer qu'une ligne est ouverte
		setIsRowOpen(true);
	}, []);

	/**
	 * Ferme la ligne actuellement ouverte
	 */
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
		isRowOpen, // pour savoir si un row est ouvert
	};
}
