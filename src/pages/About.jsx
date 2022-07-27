// rfc
import React, { useState } from 'react';
import Counter from '../components/Counter';
import MyInput from '../components/UI/input/MyInput';

const About = () => {
   // Створюємо стан для інпуту:
   const [value, setValue] = useState('Please change text in input');

   return (
      <div className="about" style={{ margin: '30px 0', textAlign: 'center' }}>
         <h1 style={{ margin: '30px 0', textAlign: 'center' }}>
            Сторінка About
         </h1>
         {/* Виведення змінної: */}
         <h1 className="input-value" style={{ height: '30px' }}>
            {value}
         </h1>
         <MyInput
            className="about-input"
            placeholder="Input your text"
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
         />
         {/* При введенні назви компонента в < /> має само імпортувати компонент: */}
         <Counter />
      </div>
   );
};

export default About;
