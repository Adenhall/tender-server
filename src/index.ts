const express = require("express");

const main = () => {
  const app = express();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`server is listening to localhost:${PORT}`);
    }
  });
};

main();
