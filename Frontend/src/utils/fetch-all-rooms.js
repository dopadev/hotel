import axios from 'axios'

export const fetchAllRooms = async () => {
	try {
		const response = await axios.get('/rooms', {})
		console.log('RESPONSE', response)
		return response.data
	} catch (error) {
		console.error('Ошибка при получении комнат:', error)
	}
}
