// rfc
import React from 'react';
import classes from './MySelect.module.css';

const MySelect = ({ options, defaultValue, value, onChange }) => {
	return (
		<select
			//value={defaultValue}
			// Визиваємо функцію з пропсів, посилаючи туди значення поточного елементу (target.value) при зміні селекту
			onChange={(event) => onChange(event.target.value)}
			className={classes.mySelect}
			name=''
			id=''
			value={value}
		>
			<option disabled value={defaultValue}>
				{defaultValue}
			</option>
			{options.map((item) => {
								return <option key={item.value} value={item.value}>
					{item.name}
				</option>
				}
			)};
		</select>
	);
};

export default MySelect;
