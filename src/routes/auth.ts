import express from "express";
import User from "../models/user";
const router = express.Router();

// TO DO: Implement authentication
router.get("/", (_req, res) => {
  res.send("Hello worldddd");
});

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

export default router;
