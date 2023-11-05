// token.test.js

const { getToken } = require("./getToken"); // replace './getToken' with the path to your getToken function

describe("Token Fetch Test", () => {
  it("should fetch a token", async () => {
    const token = await getToken();
    console.log(token);
    expect(token).toBeTruthy();
    expect(typeof token).toBe("string");
  });
});
