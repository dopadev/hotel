import { ACTION_TYPE } from '../actions'

const initialDateRangeState = {
	startDate: new Date(),
	endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24), // +1 день
}

export const dateRangeReducer = (state = initialDateRangeState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_DATE_RANGE:
			return {
				...state,
				startDate: action.payload.startDate,
				endDate: action.payload.endDate,
			}
		default:
			return state
	}
}
