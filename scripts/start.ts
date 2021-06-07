import { seedUsers } from "./seeds";
import cp from "child_process";

const main = async () => {
  await Promise.all([seedUsers()]).then((done) =>
    done.map((msg) => console.log(msg))
  );

  cp.fork("src/index.ts");
};

main();
