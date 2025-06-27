import jwt from "jsonwebtoken";

export function verificarTokenJWT(req) {
    const authHeader = req.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRECT)
        return decoded;
    } catch (error) {
        return null
    }
}