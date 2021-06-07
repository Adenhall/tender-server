import express from "express";
import User from "../models/user";
const router = express.Router();

// TO DO: Implement authentication

router.post("/signup", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateToken();
    user &&
      res.status(200).json({
        message: "Success!",
        data: { user, token },
      });
  } catch (error) {
    res.send(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  if (user) {
    const token = await user.generateToken();
    res.status(200).json({
      message: "Success",
      data: { userName: user.username, token },
    });
  } else {
    res.status(404).send("User not found");
  }
});

export default router;
