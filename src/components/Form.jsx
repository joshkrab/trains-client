import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';
import MyModal from './UI/modal/MyModal';
import Loader from './UI/loader/Loader';
import { v4 as uuid } from 'uuid';

export default function Form() {

	const [trains, setTrains] = useState([]);
	const [addVisible, setAddVisible] = useState(false);
	const [editVisible, setEditVisible] = useState(false);
	const [currentTrain, setCurrentTrain] = useState({});
	const [searchValue, setSearchValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		axios
			.get('https://trains-test.herokuapp.com')
			.then((response) => {
				setTrains(response.data);
				setIsLoading(true);
			})
			.catch((error) => {
				console.log(error.message);
			});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function addTrain(train) {
		setIsLoading(false);
			axios
			.post('https://trains-test.herokuapp.com', train)
			.then((response) => {
				setTrains(response.data);
				setIsLoading(true);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
	function editTrain(train) {
		setIsLoading(false);
		let trainId = currentTrain._id;
			axios
			.patch(`https://trains-test.herokuapp.com?id=${trainId}`, train)
			.then((response) => {
				setTrains(response.data);
				setIsLoading(true);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
	function deleteTrain(trainId) {
		setIsLoading(false);
			axios
			.delete(`https://trains-test.herokuapp.com?id=${trainId}`)
			.then((response) => {
				setTrains(response.data);
				setIsLoading(true);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
	function searchTrains(value) {
		setIsLoading(false);
			axios
			.get(`https://trains-test.herokuapp.com?search=${value}`)
			.then((response) => {
				setTrains(response.data);
				setIsLoading(true);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
	function sortTrains(value) {
		setIsLoading(false);
			axios
			.get(`https://trains-test.herokuapp.com?sort=${value}`)
			.then((response) => {
				setTrains(response.data);
				setIsLoading(true);
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
					<MyInput value={searchValue} onChange={(event) => {
						event.preventDefault();
						setSearchValue(event.target.value);
          }}/>
				</div>
					<MyButton
						onClick={(event) => {
						event.preventDefault();
						searchTrains(searchValue);
						}}
					>Search</MyButton>
					<MyButton
						onClick={(event) => {
						event.preventDefault();
						searchTrains('');
						setSearchValue('');
						}}
					>All trains</MyButton>
			</div>

			{addVisible && <MyModal visible={addVisible} setVisible={setAddVisible} buttonName={'Add train'} train='' runRequest={ addTrain } />}
			{editVisible && <MyModal visible={editVisible} setVisible={setEditVisible} buttonName={'Save'} train={ currentTrain } runRequest={ editTrain }/>}
			
				<div className="sort-panel">
					<h2>Train schedule:</h2>
				<MyButton
						onClick={(event) => {
						event.preventDefault();
						sortTrains('startDate');
						}}
				>Sort by date</MyButton>
				<MyButton
						onClick={(event) => {
						event.preventDefault();
						sortTrains('startCity');
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
				
			{!isLoading ? <Loader/> :
			<div className="trais-output">
				{trains.length ? trains.map(train => {
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
										deleteTrain(train._id)
									}}>Delete
							</MyButton>
						</div>
					</div>
				}) : <div style={{ color: 'red' }}>No trains found!</div>}
			</div>}
		</form>
	);
}
