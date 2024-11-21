import './error.css'

export const Error = ({ error }) =>
	error && (
		<div className="error">
			<h1>Error</h1>
			<h3 className="error-message">{error}</h3>
		</div>
	)
