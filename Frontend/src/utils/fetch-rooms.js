import axios from 'axios'
import { formatDate } from './format-date'

export const fetchRooms = async (startDate, endDate) => {
	try {
		const response = await axios.get('/rooms', {
			params: {
				startDate: formatDate(startDate),
				endDate: formatDate(endDate),
			},
		})
		console.log('RESPONSE', response)
		return response.data
	} catch (error) {
		console.error('Ошибка при получении комнат:', error)
	}
}
