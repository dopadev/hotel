import { request } from '../utils/request'

export const deleteRoomAsync = id => () => request(`/rooms/${id}`, 'DELETE')
