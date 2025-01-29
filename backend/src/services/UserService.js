import db from "../config/db.js";

export const getUsers = async () => {
  return await db.collection("users").find({}).toArray();
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

export const register = async (req, res) => {
  const { email, password } = req.body;
  const users = await getUsers();
  const user = users.find((user) => user.email === email);
  if (user) {
    return res.status(409).send("User already exists");
  }
  await db.users.push({ email, password });
  res.send("User created");
}

export default {
  login
}


