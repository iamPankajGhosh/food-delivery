import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("process.env.MONGO_URI")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.post("/api/user", (req, res) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

app.post("/api/user/auth", async (req, res) => {
  const { email, password } = req.body;
  await User.findOne({ email })
    .then((user) => {
      if (user.password === password) {
        res.json("success");
      } else {
        res.json("failed");
      }
    })
    .catch((err) => console.log(err));
});
