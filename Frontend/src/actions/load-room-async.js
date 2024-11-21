import { request } from '../utils/request'
import { setRoomData } from './set-room-data'

export const loadRoomAsync = roomId => dispatch =>
	request(`/rooms/${roomId}`).then(roomData => {
		if (roomData.data) {
			// если есть ответ, устанавливаем данные
			dispatch(setRoomData(roomData.data))
		}

		return roomData // возвращаем для обработки данных
	})
