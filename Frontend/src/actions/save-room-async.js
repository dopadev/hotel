import { request } from '../utils/request'
import { setRoomData } from './set-room-data'

export const saveRoomAsync = (id, newRoomData) => dispatch => {
	const saveRequest = id
		? request(`/rooms/${id}`, 'PATCH', newRoomData)
		: request('/rooms', 'POST', newRoomData)

	return saveRequest.then(updatedRoom => {
		// возвращаем, чтобы этот промис можно было обработать в post-form через then
		dispatch(setRoomData(updatedRoom.data))

		return updatedRoom.data
	})
}
