const twilio = require("twilio");
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } =
  process.env;

// // Function to generate a random OTP
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

const generateOTP = () => {
  const otpLength = 6; // Adjust the OTP length as needed
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp.padStart(otpLength, "0"); // Ensure the OTP is exactly 'otpLength' characters long
};

// Function to send OTP via Twilio
const sendOTPViaTwilio = async (phone_no, otp) => {
  const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  try {
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: TWILIO_PHONE_NUMBER,
      to: phone_no,
    });

    console.log(`OTP sent to ${phone_no}`);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

module.exports = {
  generateOTP,
  sendOTPViaTwilio,
};
