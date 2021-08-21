import { useMemo, useState } from "react";

const BoardWrite = () => {

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
	}

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
						></input>
					</div>
					<div>
						<label htmlFor="content" className="form-label">내용</label>
						<textarea
						className="form-control board-write-textarea"
						id="content"
						placeholder="내용은 최대 500자까지 입력가능합니다."
						name="content"
						value={form.content}
						onChange={onFormChange}
						></textarea>
						<p className="text-end mb-0 mt-2">
							{`${contentLength}/500`}
						</p>
					</div>
				</div>
			</div>
			<div className="d-flex justify-content-end mt-4">
				<button
				className="btn btn-secondary"
				>목록</button>
				<button
				className="btn btn-primary ms-2"
				>등록</button>
			</div>
		</>
	);
};

export default BoardWrite;