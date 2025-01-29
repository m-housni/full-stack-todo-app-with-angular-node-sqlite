import db from "../config/db.js";

export const getTasks = async (req, res) => {
  const tasks = await db.collection("tasks").find({}).toArray();
  res.status(200).send(tasks);
};

export default {
  getTasks,
};
