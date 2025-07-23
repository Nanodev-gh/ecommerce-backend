import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    const token = req.headers.token?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "You are not authenticated!" });
    }

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid!" });
        }
        req.user = user;
        next();
    });
}



export function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: "You are not allowed to do that!" });
        }
    });
}

export function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: "You are not allowed to do that!" });
        }
    });
}