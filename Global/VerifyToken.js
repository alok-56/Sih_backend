var jwt = require("jsonwebtoken");

const VerifyToken = (token) => {
 return jwt.verify(token, "SihToken", (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};

module.exports = VerifyToken;
