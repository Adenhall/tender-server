import faker from "faker";
import { MongoClient } from "mongodb";
require("dotenv").config();

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

const seedDB = async () => {
  const client = new MongoClient(
    process.env.MONGO_URL || "mongodb://localhost:27017/tender",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  try {
    await client.connect();
    console.log("Connected to the DB");

    const userCollection = client.db("tender").collection("users");

    // this will destroy all data from a collection.
    // Make sure you run it against proper database and collection.
    userCollection && (await userCollection.drop());
    console.log("Collection dropped!");

    /** List of generated users */
    let users = [];

    // Loop through 100 times to create 100 users with Faker.js
    for (let i = 0; i < 100; i++) {
      const user = {
        name: faker.name.findName(),
        age: faker.datatype.number({ min: 18, max: 100 }),
        pictureUrl: faker.image.imageUrl(),
        bio: faker.lorem.paragraph(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };
      users.push(user);
    }
    console.log("Inserting new collections...");
    await userCollection.insertMany(users);
  } catch (error) {
    console.log(error.stack);
  }
  return;
};

seedDB().then(() => {
  console.log("Successfully seeded data into database");
  process.exit();
});
