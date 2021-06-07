import faker from "faker";
import { MongoClient } from "mongodb";
require("dotenv").config();

export const seedUsers = async () => {
  const client = new MongoClient(
    process.env.MONGO_URL || "mongodb://localhost:27017/tender",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  try {
    await client.connect();

    const userCollection = client.db("tender").collection("users");

    // this will destroy all data from a collection.
    // Make sure you run it against proper database and collection.
    userCollection && (await userCollection.drop());

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
        liked: [],
        passed: [],
        match: [],
      };
      users.push(user);
    }
    await userCollection.insertMany(users);
  } catch (error) {
    console.log(error.stack);
  }

  return "Successfully seeded users data into database";
};
