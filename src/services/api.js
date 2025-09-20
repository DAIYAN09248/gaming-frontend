import axios from 'axios';

const API_URL = 'https://gaming-backend-k7tb.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Member 
export const getMembers = () => api.get('/members');
export const getMember = (id) => api.get(`/members/${id}`);
export const createMember = (member) => api.post('/members', member);
export const updateMember = (id, member) => api.put(`/members/${id}`, member);
export const deleteMember = (id) => api.delete(`/members/${id}`);

// Game APIs
export const getGames = () => api.get('/games');
export const getGame = (id) => api.get(`/games/${id}`);
export const createGame = (game) => api.post('/games', game);
export const updateGame = (id, game) => api.put(`/games/${id}`, game);
export const deleteGame = (id) => api.delete(`/games/${id}`);

// Recharge APIs
export const createRecharge = (recharge) => api.post('/recharges', recharge);

// Transaction APIs
export const createTransaction = (transaction) => api.post('/transactions', transaction);

// Collection APIs
export const getCollections = () => api.get('/collections');
export const createCollection = (collection) => api.post('/collections', collection);

export default api;