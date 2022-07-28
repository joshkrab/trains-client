import React, { useState } from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import MySelect from './UI/select/MySelect';
import Server from '../server/Server';

export default function Form() {
	const [start, setStart] = useState('Start');
	const [finish, setFinish] = useState('Finish');
	const [dateValue, setDateValue] = useState('');
	const [output, setOutput] = useState(false);

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
			<p>Місто відправлення:</p>
			<MySelect
				options={[
					{ value: 'Kyiv', name: 'Kyiv' },
					{ value: 'Lviv', name: 'Lviv' },
					{ value: 'Kharkiv', name: 'Kharkiv' },
					{ value: 'Odessa', name: 'Odessa' },
					{ value: 'Ternopil', name: 'Ternopil' },
				]}
				defaultValue='Start'
				value={start}
				onChange={(value) => {
					setStart(value);
					setOutput(false);
				}}
			/>
			<p>Місто прибуття:</p>
			<MySelect
				options={[
					{ value: 'Kyiv', name: 'Kyiv' },
					{ value: 'Lviv', name: 'Lviv' },
					{ value: 'Kharkiv', name: 'Kharkiv' },
					{ value: 'Odessa', name: 'Odessa' },
					{ value: 'Ternopil', name: 'Ternopil' },
				]}
				defaultValue='Finish'
				value={finish}
				onChange={(value) => {
					setFinish(value);
					setOutput(false);
				}}
			/>
			<div>
				<p style={{ display: 'inline', margin: '0 10px 0 0' }}>
					Дата відправлення:
				</p>
				<MyInput
					value={dateValue}
					onChange={(event) => {
						setDateValue(event.target.value);
						setOutput(false);
					}}
					className='date-input'
					type='date'
					min={today}
				/>
				<p style={{ height: '30px', padding: '6px' }}>{dateValue}</p>
			</div>

			<MyButton
				onClick={(event) => {
					event.preventDefault();
					setOutput(true);
				}}
			>
				Знайти поїзд
			</MyButton>

			<MyButton
				onClick={(event) => {
					event.preventDefault();
					setOutput(false);
					setStart('Start');
					setFinish('Finish');
					setDateValue('');
				}}
			>
				Новий пошук
			</MyButton>

			{output && <Server dateValue={dateValue} start={start} finish={finish} />}
		</form>
	);
}
