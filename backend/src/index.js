// imports
import express from 'express';
import { login, register, getUser } from './services/UserService.js';
import { getTasks } from './services/TaskService.js';


const app = express();
app.use(express.json());

const apiRouter = express.Router();


// auth
apiRouter.post('/auth/login', login);
apiRouter.post('/auth/register', register);

// users
apiRouter.get('/users/:id', getUser);

// tasks
apiRouter.get('/tasks', getTasks);


// api version
app.use('/api/v1', apiRouter);



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});