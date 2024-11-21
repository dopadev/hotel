import { ACTION_TYPE } from './action-type'

export const deleteBooking = bookingId => ({
	type: ACTION_TYPE.DELETE_BOOKING,
	payload: bookingId,
})
