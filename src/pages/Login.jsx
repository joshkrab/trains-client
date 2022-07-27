// rfc
import React, { useContext } from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import { AuthContext } from '../context';

const Login = () => {
   // Отримуємо змінні із контекста, наш стан:
   const { setIsAuth } = useContext(AuthContext);

   // Пишемо функцію на подію форми:
   const login = (event) => {
      event.preventDefault();
      setIsAuth(true);
      // Додаємо в локал-сторедж ключ і значення через кому
      localStorage.setItem('auth', 'true');
   };

   return (
      <div className="login">
         <div className="login__body">
            <h1>Input your login and password:</h1>
            <p>(Any data)</p>
            <form onSubmit={login}>
               <MyInput type="text" placeholder="Input your login" />
               <MyInput type="password" placeholder="Input your password" />
               <MyButton>Enter</MyButton>
            </form>
         </div>
      </div>
   );
};

export default Login;
