import express from "express";
import mongoose from "mongoose";
import { isEqual } from "lodash";
const router = express.Router();

import User from "../models/user";

router.get("/", async (req, res) => {
  const { liked, currentUser } = req.body;

  if (!liked) {
    res.status(400).send("Missing liked list");
  }

  try {
    const likedIDs = liked
      ? liked.map((item: string) => mongoose.Types.ObjectId(item))
      : [];
    // To include one self in order not to match yourself (Might make this a feature later)
    currentUser && likedIDs.push(mongoose.Types.ObjectId(currentUser));
    const aggregation = [
      {
        $match: {
          $expr: {
            $not: [
              {
                $in: ["$$ROOT._id", likedIDs],
              },
            ],
          },
        },
      },
    ];

    const users = await User.aggregate(aggregation);

    res.status(200).json({
      message: "Yes! More people to match",
      data: users,
    });
  } catch (error) {
    res.send(error);
  }
});

router.post("/like", async (req, res) => {
  const { matchId, currentUser } = req.body;

  if (!matchId || !currentUser) {
    res.status(400).send("Missing required parameters");
  }

  try {
    const match = await User.findById(matchId);

    if (!match) {
      res.status(404).send("User not found");
    } else {
      const user = await User.findById(currentUser);

      if (user) {
        let type = "liked";
        if (isEqual(match._id, user._id)) {
          match.match.push(user._id);
          user.match.push(match._id);
          type = "matched";
        }

        !user.liked.includes(matchId) && user.liked.push(matchId);
        await user.save();
        await match.save();

        res.status(200).json({
          message:
            type === "matched"
              ? "Match found!"
              : "Nice! Another one to the collection",
          data: {
            type,
            matchName: match.name,
            test: {
              match,
              user,
            },
          },
        });
      }
    }
  } catch (error) {
    res.send(error);
  }
});

export default router;
