import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

const BoardWrite = () => {
	const history = useHistory();

	const [form, setForm] = useState({
		title: '',
		content: '',
	});

	const contentLength = useMemo(() => {
		return form.content.length;
	}, [form.content]);

	const onFormChange = e => {
		const { name, value } = e.target;

		setForm({
			...form,
			[name]: value,
		});
	};

	const goToList = () => {
		const isCancel = window.confirm('작성하고 계시던 글 내용은 저장되지 않습니다.\n목록으로 이동하시겠습니까?');
		if (!isCancel) return;
		history.push('/board-list');
	};


  return (
		<>
			<div className="card">
				<div className="card-header">
					<h2>글쓰기</h2>
				</div>
				<div className="card-body">
					<div className="mb-3">
						<label htmlFor="title" className="form-label">제목</label>
						<input
						type="text"
						className="form-control"
						id="title"
						placeholder="제목"
						name="title"
						value={form.title}
						onChange={onFormChange}
						/>
					</div>
				<div>
						<label htmlFor="content" className="form-label">내용</label>
						<textarea
						className={`form-control board-write-textarea ${contentLength >= 500 ? 'input-error' : ''}`}
						id="content"
						placeholder="내용은 최대 500자까지 입력가능합니다."
						maxLength="500"
						name="content"
						value={form.content}
						onChange={onFormChange}
						></textarea>
						<p className={`text-end mb-0 mt-2 ${contentLength >= 500 ? 'input-error-msg' : ''}`}>
							{`${contentLength}/500`}
						</p>
					</div>
				</div>
			</div>
			<div className="d-flex justify-content-end mt-4">
				<button
				className="btn btn-secondary"
				onClick={goToList}
				>목록</button>
				<button
				className="btn btn-primary ms-2"
				>등록</button>
			</div>
		</>
	);
};

export default BoardWrite;