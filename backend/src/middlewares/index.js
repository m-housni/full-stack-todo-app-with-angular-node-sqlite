import { getUserByToken } from "../services/UserService.js";

export async function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    
    const user = await getUserByToken(token);
    if (!user) return res.sendStatus(403);
    
    req.user = user;
    next();
}0

export default {
    checkUser
}
