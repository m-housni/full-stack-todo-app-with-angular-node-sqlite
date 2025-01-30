import db from "../config/db.js";
import { ObjectId } from "mongodb";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const users = await getUsers();
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).send("User not found");
  } else if (user.password !== password) {
    return res.status(401).send("Invalid password");
  }
  // TODO: Generate JWT token
  res.send("Logged in");
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  const users = await getUsers();
  const user = users.find((user) => user.email === email);
  if (user) {
    return res.status(409).send("User already exists");
  }
  // TODO: Hash password
  const u = await db.collection("users").insertOne({ email, password });
  res.status(201).send({ id: u.insertedId, email });
}

export const getUsers = async () => {
  return await db.collection("users").find({}).toArray();
}
export const getUser = async (req, res) => {
  const { id } = req.params;
  const u = await db.collection("users").findOne({ _id: new ObjectId(id) });
  if (!u) {
    return res.status(404).send("User not found");
  }
  res.status(200).send({ id: u._id, email: u.email });
}


export default {
  login
}


