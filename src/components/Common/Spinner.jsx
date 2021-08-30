export default function Spinner({ type }) {

	return (
		<section className={`spinner-bg ${type === 'full' ? 'spinner-bg-dark' : ''}`}>
			<div className="spinner">
				<div className="spinner-border text-primary" role="status">
				</div>
			</div>
		</section>
	)
}