const Pagination = () => {
	return (
		<nav>
			<ul className="pagination mb-0">
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