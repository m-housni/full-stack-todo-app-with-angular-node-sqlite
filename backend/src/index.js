// imports
import express from 'express';
import { login, register, getUser } from './services/UserService.js';
import { getTasks } from './services/TaskService.js';


const app = express();
app.use(express.json());

app.post('/login', login);
app.post('/register', register);

app.get('/users/:id', getUser);

app.get('/tasks', getTasks);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});