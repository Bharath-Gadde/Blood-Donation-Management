const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createTokens } = require("./JWT");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "blood-donation",
});

// ...existing code...
app.post("/donor_details", (req, res) => {
  const sql =
    "SELECT * FROM donor_details WHERE LOWER(Home_address) = LOWER(?)";
  db.query(sql, [req.body.Home_address], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});
// ...existing code...

app.post("/company", async (req, res) => {
  const { Email, Password } = req.body;
  const sql = "SELECT * FROM company WHERE LOWER(Email) = LOWER(?)";

  db.query(sql, [Email, Password], async (err, data) => {
    if (err) {
      console.error("Error executing the query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length === 0) {
      return res.status(404).json("User does not exist!");
    }
    // Check if Password_hash is available in the data array
    if (data[0].Password_hash) {
      const match = await bcrypt.compare(Password, data[0].Password_hash);

      if (match) {
        const { Password_hash, ...other } = data[0];

        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(other);
      } else {
        return res.status(404).json("Incorrect password!");
      }
    } else {
      return res.status(404).json("Invalid credentials!");
    }
  });
});

app.post("/logout", (req, res) => {
  res
    .clearCookie("access_token", {
      samesite: "none",
      secure: true,
    })
    .status(200)
    .json("Logout");
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.post("/send-email", async (req, res) => {
  const { recipients, subject, text } = req.body;

  try {
    // Configure your transporter (use your real credentials)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bharathbannu999@gmail.com",
        pass: "bharath@123", // Use an app password, not your real password
      },
    });

    let info = await transporter.sendMail({
      from: '"Blood Donation" <bharathbannu999@gmail.com>',
      to: recipients, // comma-separated string or array
      subject,
      text,
    });

    res.status(200).json({ success: true, info });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

app.listen(3010, () => {
  console.log("Email server running on port 3010");
});


app.listen(3008, () => {
  console.log("Listening......");
});
