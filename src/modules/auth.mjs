import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: 3600 }
  );
  return token;
};

export const validateToken = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "Bearer not provided" });
    return;
  }
  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "Token not provided" });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;   //Here we insert the user object in the header to be validated in each request
    next();               //and then passes the req object to the router
  } catch (error) {
    res.status(401);
    res.json({ error: error });
    return;
  }
};
