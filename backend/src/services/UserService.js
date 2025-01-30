import db from "../config/db.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const users = await getUsers();
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).send("User not found");
  } else if (user.password !== password) {
    return res.status(401).send("Invalid password");
  }
  const token = jwt.sign({ email: user.email, id: user._id }, "your_secret_key", { expiresIn: "24h" });
  await db.collection("users").updateOne(
    { _id: user._id },
    { $set: { token: token } }
  );
  return res.status(200).send({ token });
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
  const { email } = req.params;
  const u = await db.collection("users").findOne({ email });
  if(u) {
    res.status(200).send(u);
  } else {  
    res.status(404).send("User not found");
  } 
}

export const getUserByToken = async (token) => {
  const user = await db.collection("users").findOne({ token });
  return user;
}

export default {
  login
}


