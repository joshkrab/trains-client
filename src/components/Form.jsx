import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import MyModal from './UI/modal/MyModal';
import { v4 as uuid } from 'uuid';

export default function Form() {


	const [trains, setTrains] = useState([]);
	const [addVisible, setAddVisible] = useState(false);
	const [editVisible, setEditVisible] = useState(false);
	const [currentTrain, setCurrentTrain] = useState({});

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

	function addTrain(train) {
			axios
			.post('https://trains-test.herokuapp.com', train)
			.then((response) => {
				console.log(response.data);
				setTrains(response.data);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
	function editTrain(train) {
			axios
			.put('https://trains-test.herokuapp.com', train)
			.then((response) => {
				console.log(response.data);
				setTrains(response.data);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}

	return (
		<form className='form'>
			<div className="search-panel">
				<h3>Search all trains by station:</h3>
				<div>
					<MyInput/>
				</div>
					<MyButton
						onClick={(event) => {
							event.preventDefault();
						}}
					>Search</MyButton>
			</div>

			{addVisible && <MyModal visible={addVisible} setVisible={setAddVisible} buttonName={'Add train'} runRequest={ addTrain } />}
			{editVisible && <MyModal visible={editVisible} setVisible={setEditVisible} buttonName={'Save'} train={ currentTrain } runRequest={ editTrain }/>}
			
				<div className="sort-panel">
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
				<MyButton
				onClick={(event) => {
							event.preventDefault();
							setAddVisible(true);
				}}
			>
				Add train
			</MyButton>
				</div>
				
			<div className="trais-output">
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
										setEditVisible(true);
										setCurrentTrain(train);
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
		</form>
	);
}
