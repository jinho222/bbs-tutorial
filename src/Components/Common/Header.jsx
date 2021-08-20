import { Link } from "react-router-dom";

const Header = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<div className="container-fluid">
				<h1 className="mb-0">
					<Link className="navbar-brand" to="/">BBS</Link>
				</h1>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link active" aria-current="page" to="/">Home</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Header;