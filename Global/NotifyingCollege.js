const nodemailer = require("nodemailer");

const SendNotification = async (email,) => {
  const mailOptions = {
    from: "easypeasy11746@gmail.com",
    to: email,
    subject: new Date(),
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>State Scholarship Portal Registration Notification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
                color: #333;
            }
    
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            h1 {
                color: #007BFF;
            }
    
            p {
                margin-bottom: 20px;
            }
    
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007BFF;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>State Scholarship Portal Registration Notification</h1>
            <p>Hello [College Name],</p>
            <p>We hope this message finds you well. We are writing to inform you that one of your students, [Student Name], is currently not registered on the State Scholarship Portal.</p>
            <p>This portal is crucial for accessing and managing scholarship opportunities. To ensure that the student doesn't miss out on available scholarships, we kindly request your assistance in guiding them through the registration process on the State Scholarship Portal.</p>
            <p>If you have any questions or need further assistance, please feel free to contact us at [Your Contact Information].</p>
            <p>Thank you for your cooperation.</p>
            <p>Best regards,<br>[Your College Name]</p>
            <a href="[State Scholarship Portal Link]" class="btn">Visit State Scholarship Portal</a>
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

module.exports = SendNotification;
