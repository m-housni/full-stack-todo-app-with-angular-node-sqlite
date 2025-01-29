import { connectDB } from "../config/db.js";

const db = await connectDB();

export const getUsers = async () => {
  return await db.users;
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  const users = await getUsers();
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).send("User not found");
  } else if (user.password !== password) {
    return res.status(401).send("Invalid password");
  }
  res.send("Logged in");
};

export default {
  login
}


