import { ACTION_TYPE } from './action-type'

export const setDateRange = (startDate, endDate) => ({
	type: ACTION_TYPE.SET_DATE_RANGE,
	payload: { startDate, endDate },
})
