import { prisma } from "../db.mjs";
import { hashPassword, comparePassword, createJWT } from "../modules/auth.mjs";

export const signupUser = async (req, res) => {
  const hash = await hashPassword(req.body.password);
  const user = await prisma.user.create({
    data: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hash,
      email: req.body.email,
      phone: req.body.phone,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      address: req.body.address,
    },
  });
  const token = createJWT(user);
  res.json({
    data: {
      token: token,
    },
  });
};
export const signinUser = async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      username: req.body.username,
    },
  });

  const isPasswordValid = await comparePassword(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) {
    res.status(401);
    res.json({ message: "Invalid username or password" });
    return;
  } else {
    const token = createJWT(user);
    res.json({ data: { token: token } });
  }
};
