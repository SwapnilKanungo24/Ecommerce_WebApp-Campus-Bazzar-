const nodemailer = require("nodemailer");

const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "campusbazzar2025@gmail.com", // your Gmail
      pass: "vgdx noci ladq mqbz",    // use Gmail App Password, not normal password
    },
  });

  const mailOptions = {
    from: "Campus Bazzar <campusbazzar2025@gmail.com>",
    to: email,
    subject: "Campus Bazzar - OTP Verification",
    text: `Your OTP for registration is: ${otp}. It is valid for 5 minutes.`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
