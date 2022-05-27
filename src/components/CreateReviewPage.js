import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function validateDate (date) {
	if (date === '') {
		return true;
	} else if (new Date(date).toString() === 'Invalid Date') {
		return false;
	}
	return true;
}

export default function CreateReviewPage() {
	const [popup, setPopup] = useState({});
	//const params = new URLSearchParams(props.location.search);
	async function handleClickPost(e) {
		e.preventDefault();
		const formElement = e.currentTarget;
		const formData = new FormData(formElement);
		const title = formData.get('title');
		const body = formData.get('body');
		const date = formData.get('date');

		if (!validateDate(date)) {
			setPopup({
				message: 'Please enter a valid date and time or leave field empty'
			});
			formElement.querySelector('input[name="date"]').value = '';
			return;
		}
		const reqBody = { title, body };
		if (date !== '') {
			reqBody.date = date;
		}
		// const res = await api.sendPostSubmitRequest(reqBody);
		// if (res.status === 200) {
		// 	if (res.data !== 'OK') {
		// 		history.push(`/posts/${res.data}`);
		// 	} else {
		// 		history.push('/');
		// 	}
		// } else if (res.status === 401) {
		// 	setPopup({ message: 'Invalid credentials. Please login again.' });
		// } else {
		// 	setPopup({ message: 'Sorry something went wrong.' });
		// }
	}

	async function handleClickComment(e) {
		e.preventDefault();
		const formElement = e.currentTarget;
		const formData = new FormData(formElement);
		const body = formData.get('body');
		// const res = await api.sendPostSubmitRequest({
		// 	title: 'Comment',
		// 	body,
		// 	parent: params.get('parentId')
		// });
		// if (res.status === 200) {
		// 	history.push(`/posts/${params.get('originalId')}`);
		// } else if (res.status === 401) {
		// 	setPopup({ message: 'Invalid credentials. Please login again.' });
		// } else {
		// 	setPopup({ message: 'Sorry something went wrong.' });
		// }
	}
	return (
		<>
			<div
				style={{
					'margin-left': '20%',
					'margin-right': '20%',
					'margin-top': '2%',
					padding: '2em'
				}}
				className='card'
			>
				<Form
					id='addPostForm'
					onSubmit={
						handleClickPost
					}
				>
					{ (
						<div className='form-group'>
							<label>Title</label>
							<Form.Control
								name='title'
								className='form-control'
								id='title'
								placeholder='Enter title'
							/>
						</div>
					)}
					<div className='form-group'>
						<label>Body</label>
						<Form.Control
							name='body'
							className='form-control'
							id='body'
							placeholder='Enter text'
						/>
					</div>
					
					<button type='submit' className='btn btn-primary'>
						Submit
					</button>
				</Form>
			</div>
		</>
	);
};