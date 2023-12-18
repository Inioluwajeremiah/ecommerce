// const bcrypt = require('bcryptjs');
import bcrypt from "bcryptjs";

// Your password to be hashed
const passwordToHash = "pass11";

// Generate a salt
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// Hash the password using the salt
const hashedPassword = bcrypt.hashSync(passwordToHash, 10);

console.log("Original Password:", passwordToHash);
console.log("Hashed Password:", hashedPassword);

bcrypt.compare(
  "pass1",
  "$2a$10$JhGOPdDf9ncvB1DNjfZ7AuRBF5iuyG2e2kUxbgvyqjXDqLkMgouPG",
  function (err, result) {
    console.log(result);
  }
);

const reslovedPassword = bcrypt.compareSync(
  "pass1",
  "$2a$10$JhGOPdDf9ncvB1DNjfZ7AuRBF5iuyG2e2kUxbgvyqjXDqLkMgouPG"
);

console.log(reslovedPassword);
