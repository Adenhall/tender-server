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
  const user = await User.find(req.body);
  !user && res.status(404).send("Not found");
  res.status(200).json({
    message: "Success",
    data: user,
  });
});

export default router;
