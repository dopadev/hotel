import { ACTION_TYPE } from '../actions'
import { ROLE } from '../constants'

const initialUserState = {
	id: null,
	login: null,
	role: ROLE.GUEST,
	session: null,
	rooms: [],
}

export const userReducer = (state = initialUserState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...payload,
			}
		case ACTION_TYPE.LOGOUT:
			return initialUserState
		case ACTION_TYPE.ADD_BOOKING:
			return {
				...state,
				rooms: [...state.rooms, payload],
			}
		case ACTION_TYPE.DELETE_BOOKING:
			return {
				...state,
				rooms: state.rooms.filter(room => room.id !== payload),
			}
		default:
			return state
	}
}
