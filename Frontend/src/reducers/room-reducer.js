import { ACTION_TYPE } from '../actions/action-type'

const initialRoomState = {
	id: '',
	number: '',
	info: '',
	price: '',
	images: [],
	bookings: [],
}

export const roomReducer = (state = initialRoomState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.ADD_BOOKING:
			return {
				...state,
				bookings: [...state.bookings, payload],
			}
		case ACTION_TYPE.DELETE_BOOKING:
			return {
				...state,
				bookings: [
					...state.bookings,
					state.bookings.filter(({ id }) => id !== payload),
				],
			}
		case ACTION_TYPE.SET_ROOM_DATA:
			return {
				...state,
				...payload,
			}
		case ACTION_TYPE.RESET_ROOM_DATA:
			return initialRoomState
		default:
			return state
	}
}
