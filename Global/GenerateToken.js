var jwt = require("jsonwebtoken");

const GenerateToken = (id) => {
  return jwt.sign({ id }, "SihToken", { expiresIn: "24h" });
};

module.exports = GenerateToken;
