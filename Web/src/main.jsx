import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import UnprotectedRoute from './UnprotectedRoute.jsx';
import CreatePostPage from './pages/logIn/CreatePostPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import FollowingPage from './pages/home/FollowingPage.jsx';
import EditPostPage from './pages/logIn/EditPostPage.jsx';
import PageNotFound from './pages/notFound/NotFoundPage.jsx';
import RegisterPage from './pages/logIn/RegisterPage.jsx';
import ExplorePage from './pages/explore/ExplorePage.jsx';
import FriendsPage from './pages/friends/FriendsPage.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';
import SearchPage from './pages/search/SearchPage.jsx';
import LoginPage from './pages/logIn/LoginPage.jsx';
import HomePage from './pages/home/HomePage.jsx';
import PostPage from './pages/post/PostPage.jsx';
import ReactDOM from 'react-dom/client';
import React from 'react';
import './styles/colors.css';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/explore',
    element: <ExplorePage />,
  },
  {
    path: '/post/:postId',
    element: <PostPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: '/search/:text',
    element: <SearchPage />,
  },
  {
    path: '/following',
    element: <ProtectedRoute element={<FollowingPage />} />,
  },
  {
    path: '/friends',
    element: <ProtectedRoute element={<FriendsPage />} />,
  },
  {
    path: '/createPost',
    element: <ProtectedRoute element={<CreatePostPage />} />,
  },
  {
    path: '/user/:userId',
    element: <ProtectedRoute element={<ProfilePage />} />,
    errorElement: <PageNotFound />,
  },
  {
    path: '/login',
    element: <UnprotectedRoute element={<LoginPage />} />,
  },
  {
    path: '/register',
    element: <UnprotectedRoute element={<RegisterPage />} />,
  },
  {
    path: '/post/:postId/edit',
    element: <ProtectedRoute element={<EditPostPage />} />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
