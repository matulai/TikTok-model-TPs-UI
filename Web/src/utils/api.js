import axios from 'axios';

export const API_URL = 'http://localhost:7070';

// ############################## USERS ##############################

const login = user => axios.post(`${API_URL}/login`, user).then(response => response);

const register = user => axios.post(`${API_URL}/register`, user).then(response => response);

const getUser = authToken =>
  axios
    .get(`${API_URL}/user`, {
      headers: {
        Authorization: authToken,
      },
    })
    .then(response => response.data);

const updateUser = (authToken, user) =>
  axios
    .put(`${API_URL}/user`, user, {
      headers: {
        Authorization: authToken,
      },
    })
    .then(response => response.data);

const getTimeline = authToken =>
  axios
    .get(`${API_URL}/user/timeline`, {
      headers: {
        Authorization: authToken,
      },
    })
    .then(response => response.data);

const getUserById = userId =>
  axios.get(`${API_URL}/user/${userId}`).then(response => response.data);

const toggleFollowUser = (authToken, userId) =>
  axios
    .put(
      `${API_URL}/user/${userId}/follow`,
      {},
      {
        headers: {
          Authorization: authToken,
        },
      }
    )
    .then(response => response.data);

const recommendAccounts = authToken =>
  axios
    .get(`${API_URL}/user/recommendAccounts`, {
      headers: {
        Authorization: authToken,
      },
    })
    .then(response => response.data);
// ############################## POSTS ##############################

const getLastestPosts = () => axios.get(`${API_URL}/latestPosts`).then(response => response.data);

const getPost = id => axios.get(`${API_URL}/post/${id}`).then(response => response.data);

const createPost = (authToken, post) =>
  axios
    .post(`${API_URL}/post`, post, {
      headers: {
        Authorization: authToken,
      },
    })
    .then(response => response.data);

const updatePost = (authToken, postId, post) =>
  axios
    .put(`${API_URL}/post/${postId}`, post, {
      headers: {
        Authorization: authToken,
      },
    })
    .then(response => response.data);

const toggleLikeOnPost = (authToken, postId) =>
  axios
    .put(
      `${API_URL}/post/${postId}/like`,
      {},
      {
        headers: {
          Authorization: authToken,
        },
      }
    )
    .then(response => response.data);

const addCommentToPost = (authToken, postId, comment) =>
  axios
    .post(`${API_URL}/post/${postId}/comment`, comment, {
      headers: {
        Authorization: authToken,
      },
    })
    .then(response => response.data);

// ############################## SEARCH ##############################

const searchUsersAndPosts = (query) =>
    axios
        .get(`${API_URL}/search?query=${query}`)
        .then((response) => response.data);

// ############################## TRENDS ##############################

const getTopTenTrends = () => axios.get(`${API_URL}/trends`).then(response => response.data);

const getPostByTrend = trendName =>
  axios.get(`${API_URL}/trends/${trendName}`).then(response => response.data);

export default {
  login,
  register,
  getUser,
  updateUser,
  getTimeline,
  getUserById,
  toggleFollowUser,
  recommendAccounts,
  getLastestPosts,
  getPost,
  createPost,
  updatePost,
  toggleLikeOnPost,
  addCommentToPost,
  searchUsersAndPosts,
  getTopTenTrends,
  getPostByTrend,
};
