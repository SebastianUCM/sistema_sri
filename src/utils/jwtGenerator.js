const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(usuario_id) {
  const payload = {
    user: {
      id: usuario_id
    }
  };
  
//the code below was the code written from the tutorial
//Look at file server/routes/dashboard.js to see the change code for this code
  
//   function jwtGenerator(usuario_id) {
//   const payload = {
//     user: usuario_id
//   };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;
