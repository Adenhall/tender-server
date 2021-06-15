import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
require("dotenv").config();
import mongoose from "mongoose";
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from '../swagger.json'

import authRouter from "./routes/auth";
import usersRouter from './routes/users'

const main = () => {
  const app = express();
  app.use(cors());

  // Parse JSON
  app.use(bodyParser.json());

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

  app.use("/auth", authRouter);
  app.use('/users', usersRouter)

  mongoose
    .connect(process.env.MONGO_URL || "mongodb://localhost:27017/tender", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected with MongoDB, Ohhhh the Tender-ness");
    })
    .catch((err) => console.log("Uh oh... ", err));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`server is listening to localhost:${PORT}`);
    }
  });
};

main();
