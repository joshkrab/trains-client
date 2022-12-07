import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import MySelect from './UI/select/MySelect';
import Server from '../server/Server';
import { v4 as uuid } from 'uuid';

export default function Form() {
	const [start, setStart] = useState('Start');
	const [finish, setFinish] = useState('Finish');
	const [dateValue, setDateValue] = useState('');
	const [output, setOutput] = useState(false);

	const [trains, setTrains] = useState([]);

	useEffect(() => {

		axios
			.get('https://trains-test.herokuapp.com')
			.then((response) => {
				console.log(response.data);
				setTrains(response.data);
			})
			.catch((error) => {
				console.log(error.message);
			});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	today = yyyy + '-' + mm + '-' + dd;

	return (
		<form className='form'>
			<p>Start City:</p>
			<MySelect
				options={[
					{ value: 'Kyiv', name: 'Kyiv' },
					{ value: 'Lviv', name: 'Lviv' },
					{ value: 'Kharkiv', name: 'Kharkiv' },
					{ value: 'Odesa', name: 'Odesa' },
					{ value: 'Ternopil', name: 'Ternopil' },
				]}
				defaultValue='Start'
				value={start}
				onChange={(value) => {
					setStart(value);
					setOutput(false);
				}}
			/>
			<p>Finish City:</p>
			<MySelect
				options={[
					{ value: 'Kyiv', name: 'Kyiv' },
					{ value: 'Lviv', name: 'Lviv' },
					{ value: 'Kharkiv', name: 'Kharkiv' },
					{ value: 'Odesa', name: 'Odesa' },
					{ value: 'Ternopil', name: 'Ternopil' },
				]}
				defaultValue='Finish'
				value={finish}
				onChange={(value) => {
					setFinish(value);
					setOutput(false);
				}}
			/>
			<div className='start-data'>
				<p style={{ display: 'inline', margin: '0 10px 0 0' }}>
					Start date and time:
				</p>
				<MyInput
			
					onChange={(event) => {
						setDateValue(event.target.value);
						setOutput(false);
					}}
					className='dat-input'
					type='date'
					min={today}
				/>
				<MyInput
					onChange={(event) => {
						setDateValue(event.target.value);
						setOutput(false);
					}}
					className='time-input'
					type='time'
				/>
			</div>

			<div className='finish-data'>
				<p style={{ display: 'inline', margin: '0 10px 0 0' }}>
					Finish date and time:
				</p>
				<MyInput
					onChange={(event) => {
						setDateValue(event.target.value);
						setOutput(false);
					}}
					className='dat-input'
					type='date'
					min={today}
				/>
					<MyInput
					onChange={(event) => {
						setDateValue(event.target.value);
						console.log(event.target.value);
					}}
					className='time-input'
					type='time'
				/>
			</div>

			<div className="search-panel">
				<h3>Search all trains by station:</h3>
				<MyInput></MyInput>
					<MyButton
						onClick={(event) => {
							event.preventDefault();
						}}
					>Search</MyButton>
			</div>

			<MyButton
				onClick={(event) => {
					event.preventDefault();
					setOutput(false);
					setStart('Start');
					setFinish('Finish');
					setDateValue('');
				}}
			>
				Add train
			</MyButton>
			<div className="trais-output">
				<h2>Train schedule:</h2>
				<MyButton
						onClick={(event) => {
							event.preventDefault();
						}}
				>Sort by date</MyButton>
				<MyButton
						onClick={(event) => {
							event.preventDefault();
						}}
				>Sort by station</MyButton>
				
				{trains.map(train => {
					const unique_id = uuid();
					return <div key={unique_id} className="train-card">
						<div className="train-info">
							<p><i>Start station:</i> { train.startCity }, Finish Station: { train.finishCity }</p>
							<p>Start date: { train.startDate }, Finish date: { train.finishDate }</p>
						</div>
						<div className="train-setup">
							<MyButton
									onClick={(event) => {
									event.preventDefault();
									}}>Edit
							</MyButton>
							<MyButton
									onClick={(event) => {
									event.preventDefault();
									}}>Delete
							</MyButton>
						</div>
					</div>
				})}
			</div>
			{output && <Server dateValue={dateValue} start={start} finish={finish} />}
		</form>
	);
}
