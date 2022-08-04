import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/UI/loader/Loader';

export default function Server({ dateValue, start, finish }) {
	const weekday = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	const d = new Date(dateValue);
	let day = weekday[d.getDay()];
	const [goodTrain, setGoodTrain] = useState([]);
	const [otherTrain, setOtherTrain] = useState([]);
	const [isRequest, setIsRequest] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		setIsRequest(true);
		axios
			.post('http://localhost:3001/api/post/', {
				start: start,
				finish: finish,
				day: day,
			})
			.then((response) => {
				setGoodTrain(response.data);
			})
			.catch((error) => {
				setError(error.message);
			});
	}, [day, finish, start]);

	useEffect(() => {
		axios
			.post('http://localhost:3001/api/other/', {
				start: start,
				finish: finish,
				day: day,
			})
			.then((response) => {
				setOtherTrain(response.data);
				setIsRequest(false);
			})
			.catch((error) => {
				setError(error.message);
			});
	}, [day, finish, start]);

	if (
		start === finish ||
		start === 'Start' ||
		finish === 'Finish' ||
		dateValue === ''
	) {
		return (
			<h2 className='output-body' style={{ color: 'red' }}>
				Введіть коректні дані!
			</h2>
		);
	} else if (error) {
		return (
			<h2 className='output-body' style={{ color: 'red' }}>
				{error} - run server!
			</h2>
		);
	} else {
		return isRequest ? (
			<Loader />
		) : (
			<div className='output-body'>
				{goodTrain[0] ? (
					<div>
						<p className='output-title'>Поїзд на ваш запит:</p>
						{goodTrain.map((item) => {
							return (
								<div className='output-train' key={item.train}>
									Поїзд №:{item.train}, {item.startstation}-{item.finishstation}
									, {dateValue}-{day}
								</div>
							);
						})}
					</div>
				) : (
					<p style={{ color: 'red' }}>По вашему запиту поїзду не знайдено...</p>
				)}

				{otherTrain[0] ? (
					<div>
						<p className='output-title'>
							Інші поїзди в цей день: {dateValue} - {day}, на станції {start}:
						</p>
						{otherTrain.map((item) => {
							return (
								<div className='output-train' key={item.train}>
									Поїзд №:{item.train}, {item.startstation}-{item.finishstation}
									, {dateValue}-{day}
								</div>
							);
						})}
					</div>
				) : (
					<p>Більше поїздів не знайдено...</p>
				)}
			</div>
		);
	}
}
