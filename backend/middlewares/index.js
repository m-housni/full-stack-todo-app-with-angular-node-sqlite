import { getUsers } from "../services/UserService.js";

export async function checkUser(req, res, next) {
    const { email, password } = req.body;
    const users = await getUsers();
    console.log(users);
    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(401).send("User not found");
    } else if (user.password !== password) {
        return res.status(401).send("Invalid password");
    } else {
        next();
    }
}

export default {
    checkUser
}
