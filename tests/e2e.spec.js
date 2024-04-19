const passport = require("passport");
const app = require("../app.js");
const { connectToMongoDB } = require("../database.js");

describe("E2E tests", () => {
  let mongoDB;
  const clearDB = async () => {
    if (mongoDB) {
      const collections = await mongoDB.db.collections();
      for (let collection of collections) {
        await collection.deleteMany();
      }
    }
  };

  beforeAll(async () => {
    const TEST_DB = "mongodb://localhost:27017/test";
    // const MONGODB_CONNECTION_URI = TEST_DB;
    const mongoDB = connectToMongoDB(TEST_DB);
  });

  beforeEach(async () => {
    await jest.resetAllMocks();
  });

//   afterAll(async () => {
//     await mongoDB.connection.close();
//   });

  it("Should not login", async () => {
    await clearDB();
    req.body = {
      username: "alexanderObi",
      password: "testPassword",
    };
    const res = await request(app);
    await res
      .post("/auth/login")
      .passport.authenticate("local", { failureRedirect: "/login" });
    console.log(res.body);
    console.log(res.statusCode);
    expect(res.statusCode.toEqual("404"));
  });
});
