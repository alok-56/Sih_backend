const nodemailer = require("nodemailer");

const NotifyCollege = async (
  email,
  StudenetName,
  Application,
  status,
  CollegeName
) => {
  const mailOptions = {
    from: "easypeasy11746@gmail.com",
    to: email,
    subject: new Date(),
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Scholarship Application Notification</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          color: #333333;
        }
    
        p {
          color: #666666;
        }
    
        .cta-button {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 20px;
          background-color: #3498db;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
    
        .footer {
          margin-top: 20px;
          color: #888888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Scholarship Application Notification</h1>
        <p>Dear ${CollegeName},</p>
        <p>We are pleased to inform you that several students have successfully applied for the scholarship program at [College Name]. This is a great achievement, and we appreciate the effort and interest shown by the students.</p>
        <p>We kindly request you to review the applications at your earliest convenience and proceed with the necessary evaluation process.</p>
        <p>If you are not registered in portal of home State. Click on Link to Start Verification Process</p>
        <a href="http://127.0.0.1:5173/University" class="cta-button">View Applications</a>
        <a>Status : ${status}<a/>
        <a>StudentName : ${StudenetName}<a/>
        <a>ApplicationId : ${Application}<a/>
        <p class="footer">Thank you for your attention to this matter. If you have any questions or require further assistance, please feel free to contact us.</p>
      </div>
    </body>
    </html>
    
    `,
  };

  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "easypeasy11746@gmail.com",
        pass: "eyqunwdhrpkbzvwg",
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject(error); // Reject the Promise in case of an error
      } else {
        console.log("Email sent: " + info.response);
        resolve(info); // Resolve the Promise with the result in case of success
      }
    });
  });
};

module.exports = NotifyCollege;
