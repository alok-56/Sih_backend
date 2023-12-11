const nodemailer = require("nodemailer");

const SendEmailUpdate = async (email, Name, status) => {
  const mailOptions = {
    from: "easypeasy11746@gmail.com",
    to: email,
    subject: new Date(),
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Scholarship Update</title>
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
            <h1>Scholarship Update</h1>
            <p>Hello ${Name},</p>
            <p>We are pleased to inform you about the status of your scholarship application. After careful consideration, we are excited to let you know that your application has been:</p>
            <p>Details of the scholarship update:</p>
            <ul>
                <li><strong>Status:</strong>${status}</li>
            </ul>
            <p>If you have any questions or concerns, please feel free to contact us at [Contact Email].</p>
            <p>Best regards,<br>[Your Organization Name]</p>
            <a href="[Your Website URL]" class="btn">Visit Our Website</a>
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

module.exports = SendEmailUpdate;
