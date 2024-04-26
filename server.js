const express = require("express");
app = express();

const port = 5000;
const cors = require("cors");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cors());

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tasks",
  password: "dragonballsuper123",
  port: 5432,
});

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email address",
    });
  }

  try {
    const results = await pool.query(
      "SELECT * FROM users where username = $1 OR email =$2",
      [username, email]
    );
    if (results.rows.length > 0) {
      return res.status(400).json({
        message: "Username or Email is already taken",
      });
    }
    const saltRounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltRounds);

    await pool.query(
      "INSERT INTO users (username, email, hashed_password) VALUES ($1, $2, $3)",
      [username, email, hashedpassword]
    );
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occured while registering the user",
    });
  }
});

app.post("api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const findemail = await pool.query(
      "SELECT * FROM users where username = $1",
      [email]
    );

    if (findemail.rows.length === 0) {
      return res.status(404).json({
        message: "Email or password not found",
      });
    }

    const user = results.rows[0];

    const passwordValid = bcrypt.compare(password, user.hashed_password);

    if (!passwordValid) {
      return res.status(400).json({
        message: "Password or email is invalid",
      });
    }

    res.status(200).json({
      message: "Login Successfull",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "There was an error while login",
    });
  }
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
