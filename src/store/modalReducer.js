const defaultState = {
	onModal: false,
	modalType: '',
}

const ON_MODAL = 'ON_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

export const modalReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ON_MODAL:
			return { ...state, onModal: action.onModal, modalType: action.modalType };
		case CLOSE_MODAL:
			return { ...state, onModal: action.onModal };
		default: return state;
	}
}

export const onModalAction = (onModal, modalType) => ({ type: ON_MODAL, onModal, modalType });
export const closeModalAction = (onModal) => ({ type: CLOSE_MODAL, onModal });