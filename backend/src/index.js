// imports
import express from 'express';
import { login, register } from './services/UserService.js';

const app = express();
app.use(express.json());

app.post('/login', login);
app.post('/register', register);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});