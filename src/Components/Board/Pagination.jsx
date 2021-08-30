import { useEffect } from "react";
import { useState } from "react";

export default function Pagination({
	pageNo,
	postsPerPage,
	totalCnt,
	fetchBoardList,
}) {
	/* states */
	const [block, setBlock] = useState(null);

		
	/* methods */
	const onPageClick = page => {
		fetchBoardList(page);
	}

	const changeBlock = params => {
		if (params === 'prev') {
			const floored = Math.floor((pageNo - 1) / postsPerPage) * 5;
			if (floored === 0) {
				alert('처음 페이지입니다.');
				return;
			}
			fetchBoardList(floored);	
		} else if (params === 'next') {
			const ceiled = Math.ceil(pageNo / postsPerPage) * postsPerPage + 1;
			const totalPages = Math.ceil(totalCnt / postsPerPage); 
			if (ceiled > totalPages) {
				alert('마지막 페이지입니다');
				return;
			}
			fetchBoardList(ceiled);	
		}
	}
	
	/* effects */
	useEffect(() => {
		const startIndex = Math.floor((pageNo - 1) / postsPerPage) * postsPerPage + 1

		const ceiled = Math.ceil(pageNo / postsPerPage) * postsPerPage;
		const totalPages = Math.ceil(totalCnt / postsPerPage);
		const endIndex = Math.min(ceiled, totalPages);

		const newBlock = [];
		for (let i = startIndex; i < endIndex + 1; i++) { newBlock.push(i) };
		setBlock([...newBlock]);
		console.log(startIndex, endIndex, newBlock);
	}, [pageNo, postsPerPage, totalCnt]);


	return (
		<nav>
			<ul className="pagination mb-0">
				<li className="page-item" onClick={() => changeBlock('prev')}>
					<span className="page-link">&lt;</span>
				</li>
				{
					block?.length > 0 &&
					block.map(page => {
						return (
							<li
							className={`page-item ${pageNo === page ? 'active' : ''} ` }
							key={page}
							onClick={() => onPageClick(page)}>
								<span className="page-link">{ page }</span>
							</li>
						)
					})
				}
				<li className="page-item" onClick={() => changeBlock('next')}>
					<span className="page-link">&gt;</span>
				</li>
			</ul>
		</nav>
	);
};