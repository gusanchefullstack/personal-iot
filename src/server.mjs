import express from "express";
import router from "./router.mjs";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Personal IoT app" });
});

app.use("/api", router);
app.post("/signup", signupUser);
app.post("/signin", signinUser);

export default app;
