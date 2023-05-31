import prisma from "../../../prisma/client";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  res.status(200).json({ message: "New Alert Received" });
  const trade = JSON.parse(req.body);

  //get the asset
  const asset = await prisma.asset.findFirst({
    where: {
      address: trade.amm.toLowerCase(),
    },
  });

  //get the subscribers for the proTrader & asset
  const emailSubscribers = await prisma.subscriber.findMany({
    where: {
      proTrader: trade.trader,
      subscribed: true,
      assetId: parseInt(asset.id),
    },
  });

  //return console.log(emailSubscribers);

  //extract the emails
  const extractedEmails = emailSubscribers.map((email) => email.subscriber);
  console.log(extractedEmails);

  //send email asynchronously
  async function sendEmail(recipients) {
    // Create a transporter
    let transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4fd91722190f81",
        pass: "4117054da30836",
      },
    });

    // Define email options
    let mailOptions = {
      from: "tracker@perptracker.com",
      subject: "New Tracker Update",
      text: `Your subscribed trader: ${trade.trader} just got a ${trade.amm}. With a margin of: ${trade.margin}`,
    };

    try {
      // Send emails asynchronously
      let sendPromises = recipients.map(async (recipient) => {
        mailOptions.to = recipient;
        await transporter.sendMail(mailOptions);
        console.log("Email sent to", recipient);
      });

      await Promise.all(sendPromises);
      console.log("All emails sent successfully");
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  }

  sendEmail(extractedEmails);
}
