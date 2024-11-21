import { request } from '../utils/request'
import { addBooking } from './add-booking'

export const addBookingAsync = (roomId, checkin, checkout) => dispatch => {
	request(`/rooms/${roomId}/bookings`, 'POST', { checkin, checkout }).then(
		booking => {
			dispatch(addBooking(booking.data))
		},
	)
}
