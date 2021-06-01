import express from "express";
const cors = require("cors");
import authRouter from "./routes/auth";

const main = () => {
  const app = express();
  app.use(cors());

  app.use("/auth", authRouter);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`server is listening to localhost:${PORT}`);
    }
  });
};

main();
