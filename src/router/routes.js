import About from '../pages/About';
import Login from '../pages/Login';
import PostIdPage from '../pages/PostIdPage';
import Posts from '../pages/Posts';
import PostsScroll from '../pages/PostsScroll';

export const privateRoutes = [
   {
      path: '/posts',
      component: Posts,
      exact: true,
   },
   {
      path: '/posts-scroll',
      component: PostsScroll,
      exact: true,
   },
   {
      path: '/about',
      component: About,
      exact: true,
   },
   {
      path: '*',
      component: Posts,
      exact: true,
   },
   {
      path: '/posts/:id',
      component: PostIdPage,
      exact: true,
   },
];

export const publicRoutes = [
   {
      path: '/login',
      component: Login,
      exact: true,
   },
   {
      path: '*',
      component: Login,
      exact: true,
   },
];
