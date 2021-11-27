const defaultState = {
	onModal: false,
	modalContent: ''
}

const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

export const modalReducer = (state = defaultState, action) => {
	switch (action.type) {
		case OPEN_MODAL:
			return { ...state, onModal: true, modalContent: action.modalContent };
		case CLOSE_MODAL:
			return { ...state, onModal: false };
		default: return state;
	}
}

export const openModalAC = (modalContent) => ({ type: OPEN_MODAL, modalContent });
export const closeModalAC = () => ({ type: CLOSE_MODAL });