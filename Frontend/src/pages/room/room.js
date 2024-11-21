import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useParams } from 'react-router-dom'
import { ROLE } from '../../constants'
import { selectRoom } from '../../selectors'
import { ACTION_TYPE, loadRoomAsync } from '../../actions'
import { PrivateContent, RoomContent, RoomForm } from './components'
import { Error } from '../../components'

export const Room = () => {
	const [error, setError] = useState(null) // ИЗМЕНЕНО по умолчанию устанавливаем ошибку (true), чтобы не выводились комментарии без поста. true не выводится в разметку, поэтому ошибку на странице не увидим. Затем сделаем запрос на сервер, и если ответ будет успешным, то устанавливаем false (увидим разметку), иначе - выводим ошибку
	const [isLoading, setIsLoading] = useState(true)

	const dispatch = useDispatch()
	const params = useParams()
	const isCreating = !!useMatch('/room') // вместо объекта - true / false
	const isEditing = !!useMatch('/room/:id/edit') // вместо объекта - true / false
	const room = useSelector(selectRoom)

	useLayoutEffect(() => {
		dispatch({ type: ACTION_TYPE.RESET_ROOM_DATA })
	}, [dispatch, isCreating])

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false)
			return
		}

		dispatch(loadRoomAsync(params.id)).then(postData => {
			setError(postData.error)
			setIsLoading(false)
		})
	}, [dispatch, params.id, isCreating])

	if (isLoading) return null

	const page =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<div className="room-form">
					<RoomForm room={room} />
				</div>
			</PrivateContent>
		) : (
			<div className="room-content">
				<RoomContent room={room} />
			</div>
		)

	return error ? <Error error={error} /> : page
}
