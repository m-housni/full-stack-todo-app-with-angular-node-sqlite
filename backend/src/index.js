// imports
import express from "express";
import { login, register, getUser } from "./services/UserService.js";
import { getTasks } from "./services/TaskService.js";
import cors from "cors";

const app = express();
app.use(express.json());

// Enable CORS for all origins (for development, be more specific in production)
const corsOptions = {
  origin: 'http://localhost:4200', // Or an array of allowed origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'], // Add any custom headers
  credentials: true, // If you need to send cookies in cross-origin requests
};
app.use(cors(corsOptions));

const apiRouter = express.Router();
// auth
apiRouter.post("/auth/login", login);
apiRouter.post("/auth/register", register);
// users
apiRouter.get("/users/:id", getUser);
// tasks
apiRouter.get("/tasks", getTasks);
// api version
app.use("/api/v1", apiRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
