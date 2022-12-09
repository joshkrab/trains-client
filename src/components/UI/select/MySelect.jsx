// rfc
import React from 'react';
import classes from './MySelect.module.css';

const MySelect = ({ options, defaultValue, value, onChange, train }) => {
	return (
		<select
			//value={defaultValue}
			// Визиваємо функцію з пропсів, посилаючи туди значення поточного елементу (target.value) при зміні селекту
			onChange={(event) => onChange(event.target.value)}
			className={classes.mySelect}
			name=''
			id=''
			defaultValue={train ? train : defaultValue}
			//value={train && value}
			
		>
			<option disabled value={defaultValue}>
				{defaultValue}
			</option>
			{options.map((item) => {
				if (item.value === train) {
					return <option key={item.value} value={item.value}>
					{item.name}
				</option>
				}
				return <option key={item.value} value={item.value}>
					{item.name}
				</option>
				}
			)};
		</select>
	);
};

export default MySelect;
