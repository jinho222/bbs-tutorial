export default function Alert({ msg }) {
	return (
			<div className="alert alert-danger mt-4 d-flex">
					<img src="/images/error-warning-line.png" alt="유효하지않음" />
					<span className="ms-2">{msg}</span>
			</div>
	)
}