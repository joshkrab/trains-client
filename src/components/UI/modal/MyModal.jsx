// rfc
import React, { useState, useEffect } from 'react';
import classes from './MyModal.module.css';
import MySelect from '../select/MySelect';
import MyInput from '../input/MyInput';
import MyButton from '../button/MyButton';

const MyModal = ({ visible, setVisible, buttonName, train, runRequest }) => {
   const [start, setStart] = useState('');
   const [finish, setFinish] = useState('');
   const [startDate, setStartDate] = useState('');
   const [finishDate, setFinishDate] = useState('');
   const [startTime, setStartTime] = useState('');
   const [finishTime, setFinishTime] = useState('');
   const rootClasses = [classes.myModal];

   useEffect(() => {
	if (train) {
      setStart(train.startCity);
      setFinish(train.finishCity);
   };
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

   const newTrain = {
      startCity: start,
      finishCity: finish,
      startDate: `${startDate}T${startTime}`, // "2022-12-30T10:00",
      finishDate: `${finishDate}T${finishTime}`
   };

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

   // Додаємо перевірку на видимість:
   if (visible) {
      rootClasses.push(classes.active);
   }

   return (
      // .join(' ') - метод повертає рядок, тобто два класа з'єднає через пробіл:
      <div className={rootClasses.join(' ')} >
         {/* Пропс чілдрен переносить контент з тега */}
         <div className={classes.myModalContent}>
            <div className="cities-row">
               <div className="cities-start">
                  <p>Start City:</p>
                  <MySelect
                     options={[
                        { value: 'Kyiv', name: 'Kyiv' },
                        { value: 'Lviv', name: 'Lviv' },
                        { value: 'Kharkiv', name: 'Kharkiv' },
                        { value: 'Odesa', name: 'Odesa' },
                        { value: 'Ternopil', name: 'Ternopil' },
                     ]}
                     defaultValue={'Start'}
                     value={start}
                     train={train?.startCity}
                     onChange={(value) => {
                        setStart(value);
                     }}
                  />
               </div>
               <div className="cities-finish">
                  <p>Finish City:</p>
                  <MySelect
                     options={[
                        { value: 'Kyiv', name: 'Kyiv' },
                        { value: 'Lviv', name: 'Lviv' },
                        { value: 'Kharkiv', name: 'Kharkiv' },
                        { value: 'Odesa', name: 'Odesa' },
                        { value: 'Ternopil', name: 'Ternopil' },
                     ]}
                     defaultValue={'Finish'}
                     value={finish}
                     train={train?.finishCity}
                     onChange={(value) => {
                        
                        setFinish(value);
                     }}
                  />
               </div>

            </div>
            
            <div className='start-data'>
               <p>
                  Start date and time:
               </p>
               <MyInput
                  onChange={(event) => {
                     event.preventDefault();
                     setStartDate(event.target.value);
                  }}
                  className='dat-input'
                  type='date'
                  min={today}
               />
               <MyInput
                  onChange={(event) => {
                     event.preventDefault();
                     setStartTime(event.target.value);
                  }}
                  className='time-input'
                  type='time'
               />
            </div>

            <div className='finish-data'>
               <p>
                  Finish date and time:
               </p>
               <MyInput
                  onChange={(event) => {
                     event.preventDefault();
                     setFinishDate(event.target.value);
                  }}
                  className='dat-input'
                  type='date'
                  min={today}
               />
               <MyInput
                  onChange={(event) => {
                     event.preventDefault();
                     setFinishTime(event.target.value);
                  }}
                  className='time-input'
                  type='time'
               />
            </div>
            <MyButton
               onClick={(event) => {
                  event.preventDefault();
                  if (
                     newTrain.startCity !== newTrain.finishCity &&
                     newTrain.startCity !== 'Start' && newTrain.finishCity !== 'Finish' &&
                     startDate && startTime && finishDate && finishTime
                     ) {
                     runRequest(newTrain);
                     setVisible(false);
                  } else {
                     alert('Input correct data!')
                  }
               }}
            >
               { buttonName }
            </MyButton>
            <MyButton
               onClick={(event) => {
                  event.preventDefault();
                  setVisible(false);
               }}
            >
               Cancel
            </MyButton>
         </div>
      </div>
   );
};

export default MyModal;
