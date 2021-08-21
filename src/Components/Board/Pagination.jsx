const Pagination = () => {
	return (
		<nav className="d-flex justify-content-center">
			<ul className="pagination">
				<li className="page-item">
					<span className="page-link">&lt;</span>
				</li>
				<li className="page-item">
					<span className="page-link">1</span>
				</li>
				<li className="page-item">
					<span className="page-link">2</span>
				</li>
				<li className="page-item">
					<span className="page-link">3</span>
				</li>
				<li className="page-item">
					<span className="page-link">&gt;</span>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;