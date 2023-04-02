require("dotenv").config();
const User = require("../models/user");

const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SIB_API_KEY;

// Instantiate the transactional emails API
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

exports.forgotPasswordHandler = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    const sendEmailRequest = {
      to: [{ email: user.email }],
      sender: {
        email: "lokiagro@gmail.com",
        name: "Shivam",
      },
      subject: "Forgot Password",
      textContent: "check {{params.password}}",

      params: { password: "USER_PASSWORD" }, // Replace with any dynamic parameters you want to include in the email
    };

    const sendEmailResponse = await apiInstance.sendTransacEmail(
      sendEmailRequest
    );
    console.log("Email sent successfully!", sendEmailResponse);
  } catch (error) {
    console.error("Email could not be sent:", error);
  }
};
