const sendEmail = require('../sendEmail')
require('dotenv').config()

const emailVerification = async ({ name, email, url }) => {
  const message = `
    <div style="display: flex; justify-content: center">
    
        <div style="border: 1px solid #555;border-radius: 5px;padding: 2vw 5vw 0.5em 5vw;color: #555;width: 80%;">
            <div class="head" style="border-bottom: 1px solid #555; padding-bottom: 10px">
              <a href="http://localhost:5000"
                ><img
                  src="https://i.postimg.cc/2jhpHL9B/Logo.png"
                  alt="teephaflowersandfabrics_logo"
                  width="100px"
                  style="display: block; margin: auto"
              /></a>
              <h2 style="text-align: center">Verify your account</h2>
            </div>
            <div class="body" style="padding-top: 10px">
              <h3>Hello, ${name}</h3>
              <p>
                We received your signup request to register as one of our customers.
              </p>
              <p>
                Your request requires further verification to enable you sign in into
                your customer dashboard
              </p>
              <p>Please click the button below to verify your account</p>
              <a
                href="${url}"
                style="
                  display: flex;
                  justify-content: center;
                  width: 50%;
                  margin: 30px auto;
                  letter-spacing: 5px;
                  padding: 10px 20px;
                  box-shadow: 5px 5px 3px #999;
                  border: 1px dashed #555;
                  font-size: 20px;
                  font-weight: bold;
                  text-decoration: none;
                  color: #555;
                "
                >VERIFY</a
              >
              <i style="display: block"
                ><small>***this link will expire in 5 minutes***</small></i
              >
            </div>
            <p>
              If you did not attempt to create an account, please send and email to
              <a href="/">support@tflowersandfabrics.com</a> to enable us disable the
              account.
            </p>
            <p>
              Thanks, <br />
              Admin
            </p>
            <hr />
            <small>&copy; 2022 tflowersandfabrics.com</small>
          </div></div>`
  return sendEmail({
    from: `Africommerce Online Market <${process.env.MAIL_USER}>`,
    to: email,
    subject: 'Email Verification',
    html: message
  })
}

module.exports = emailVerification