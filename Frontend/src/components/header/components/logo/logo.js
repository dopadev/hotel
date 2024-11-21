import { Link } from 'react-router-dom'
import logo from '../../../../img/logo.png'
import './logo.css'

export const Logo = () => {
	return (
		<Link to="/" className="header-logo">
			<img
				className="header-logo-image"
				src={logo}
				alt="dopadev logo"
				width="167.4"
				height="13.6"
				loading="lazy" // изображение загрузится, когда пользователь дойдёт до него
			></img>
		</Link>
	)
}
