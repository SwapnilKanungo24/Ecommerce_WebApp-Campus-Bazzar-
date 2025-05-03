// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const sendOTP = require("../utils/sendOtp");
// const path = require("path");
// const { User } = require("../models/userSchema");

// // Secret Key for JWT (Use .env in production)
// const JWT_SECRET = "SecretKey220292"; 

// // Register New User
// const registerUser = async (req, res) => {
//     const { name, collegeID, email, number, password } = req.body;

//     // Email domain validation
//     if (!email.endsWith("@acropolis.in")) {
//     return res.status(400).json({ message: "Only Acropolis Institute emails are allowed." });
//     }

//     try {
//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//              return res.status(400).json({ message: "User already exists" });
//            // res.render("register", { error: "User already exists" });
//         }

//         // Hash Password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create New User
//         const newUser = new User({
//             name,
//             collegeID,
//             email,
//             number,
//             password: hashedPassword
//         });

//         await newUser.save();

//         // Store user data in session
//         req.session.user = newUser;

//         // Redirect to home page (correct usage)
//         return res.redirect("/home");
//     } catch (error) {
//         console.error("Registration Error:", error);
//         return res.status(500).sendFile(path.join(__dirname, "../views/index.html"));
//     }
// };

// // Login User
// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Check if user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "User not found" });
//         }

//         // Compare Password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Generate JWT Token
//         const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

//         // ✅ Store user session (so home.ejs can access it)
//         req.session.user = user;

//         // ✅ Redirect to home page after successful login
//         return res.redirect("/home");
//     } catch (error) {
//         console.error("Login Error:", error);
//         return res.status(500).sendFile(path.join(__dirname, "../views/index.html"));
//     }
// };

// module.exports = { registerUser, loginUser };
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendOTP = require("../utils/sendOtp");
const path = require("path");
const { User } = require("../models/userSchema");

// Secret Key for JWT (Use .env in production)
const JWT_SECRET = "SecretKey220292";

// Request OTP Before Registration
const registerUser = async (req, res) => {
    const { name, collegeID, email, number, password } = req.body;

    // Email domain validation
    if (!email.endsWith("@acropolis.in")) {
        return res.render("register", { error: "Only Acropolis Institute emails are allowed." });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render("register", { error: "User already exists" });
        }

        // Generate OTP and store user data in session
        const otp = Math.floor(100000 + Math.random() * 900000);
        req.session.otp = otp;
        req.session.tempUser = { name, collegeID, email, number, password };

        // Send OTP to email
        await sendOTP(email, otp);

        return res.render("verify", { error: null });
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).render("register", { error: "Something went wrong. Please try again." });
    }
};

// Verify OTP and Register User
const verifyOtp = async (req, res) => {
    const { otp } = req.body;

    if (parseInt(otp) !== req.session.otp) {
        return res.render("verify", { error: "Invalid OTP. Please try again." });
    }

    try {
        const { name, collegeID, email, number, password } = req.session.tempUser;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            collegeID,
            email,
            number,
            password: hashedPassword
        });

        await newUser.save();
        req.session.user = newUser;

        delete req.session.otp;
        delete req.session.tempUser;

        return res.redirect("/home");
    } catch (error) {
        console.error("OTP Verification Error:", error);
        res.status(500).render("verify", { error: "Something went wrong during verification." });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
        req.session.user = user;

        return res.redirect("/home");
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).sendFile(path.join(__dirname, "../views/index.html"));
    } 
};

//logoutUser 
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout Error:", err);
        return res.status(500).send("Logout failed");
      }
      res.clearCookie("connect.sid"); // optional but good
      return res.redirect("/login");
    });
  };

module.exports = { registerUser, verifyOtp, loginUser, logoutUser };

