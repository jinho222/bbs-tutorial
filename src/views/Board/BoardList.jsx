import Pagination from '../../components/Board/Pagination';
import { Link, useHistory } from 'react-router-dom';

const BoardList = () => {
	const history = useHistory();

	const goToBoardView = e => {
		const { index } = e.target.dataset;
		history.push(`/board-view/${index}`);
	}

	return (
		<>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">No.</th>
						<th scope="col">제목</th>
						<th scope="col">작성자</th>
						<th scope="col">조회수</th>
						<th scope="col">날짜</th>
					</tr>
				</thead>
				<tbody>
					{
						Array(8).fill(0).map((_, i) => {
							return (
								<tr key={i}>
									<th scope="row">1</th>
									<td className="board-list-title" data-index={i} onClick={goToBoardView}>
										제목이 입력됩니다.제목이 입력됩니다.제목이 입력됩니다.
									</td>
									<td>진호</td>
									<td>12</td>
									<td>2021-08-12</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
			<div className="d-flex justify-content-center position-relative">
				<Pagination/>
				<Link
				className="btn btn-primary btn-write"
				to="/board-write"
				>글쓰기</Link>
			</div>
		</>
	)
};

export default BoardList;