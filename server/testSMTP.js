require('dotenv').config({ path: '../.env' });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: process.env.SMTP_PORT || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'no-reply@vault.arcbyte.co',
    pass: process.env.SMTP_PASS
  }
});

async function runTest() {
  console.log('Initiating Hostinger SMTP relay test...');
  console.log(`Authenticating as: ${process.env.SMTP_USER}`);
  
  try {
    const info = await transporter.sendMail({
      from: `"ArcVault Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send email to itself for testing
      subject: 'ArcVault System Verification',
      text: 'This is an automated system check from your local development environment verifying that your SMTP password integration was fully successful!',
    });
    
    console.log('================================');
    console.log('STATUS: SUCCESS!');
    console.log('Message ID: ', info.messageId);
    console.log('The Hostinger SMTP server successfully authenticated and routed your payload.');
    console.log('================================');
  } catch (error) {
    console.log('================================');
    console.log('STATUS: FAILED');
    console.error(error.message);
    console.log('Ensure that Hostinger has allowed SMTP access for this account and the password contains no unescaped variables.');
    console.log('================================');
  }
}

runTest();
