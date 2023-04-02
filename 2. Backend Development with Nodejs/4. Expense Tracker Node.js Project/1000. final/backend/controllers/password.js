const uuid = require("uuid");
require("dotenv").config();
const User = require("../models/user");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const Forgotpassword = require("../models/forgotPassword");
const bcrypt = require("bcrypt");

exports.forgotPasswordHandler = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      const id = uuid.v4();
      console.log("id : ", id);

      await user
        .createForgotpassword({ id, active: true, used: false })
        .catch((err) => {
          throw new Error("record making failed");
        });

      const defaultClient = SibApiV3Sdk.ApiClient.instance;

      // Configure API key authorization: api-key
      const apiKey = defaultClient.authentications["api-key"];
      apiKey.apiKey = process.env.SIB_API_KEY;

      // Instantiate the transactional emails API
      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

      const sendEmailRequest = {
        to: [{ email: user.email }],
        sender: {
          email: "lokiagro@gmail.com",
          name: "Shivam",
        },
        subject: "Forgot Password",
        textContent: "check ",
        htmlContent: `<h1>Password reset</h1>
        <a href="http://localhost:3000/password/resetPassword/${id}">Reset password</a>`,
      };

      const sendEmailResponse = await apiInstance.sendTransacEmail(
        sendEmailRequest
      );
      console.log("failed");

      console.log(sendEmailResponse);

      return res.json("Email sent successfully!");
    } else {
      throw new Error("user doesn not exists");
    }
  } catch (error) {
    res.status(500).json({ msg: "Email could not be sent", error });
  }
};

exports.resetPasswordHandler = async (req, res) => {
  try {
    const id = req.params.id;

    const FpRecord = await Forgotpassword.findOne({ where: { id } });

    if (FpRecord) {
      console.log("1");
      if (!FpRecord.active) {
        return res.status(200).send(`<html>
                              <h1>Link expired<h1>
                              <p>Try forgot password again</p>
                              <a href = "http://localhost:5500/password/forgotPassword.html">frogot password</a>
                              </html>`);
        //**res.end();
        // When the first call to res.end() is executed,
        //the response is sent to the client and the response process is ended.
        //However, the code then attempts to send another response with the second call to res.send(),
        //resulting in the ERR_HTTP_HEADERS_SENT error.
      }

      console.log("2");
      await FpRecord.update({ active: false });
      //     res.status(200).send(`<html>
      //     <form onsubmit="reset(event); return false;">
      //     <label for="newPassword">Enter New password</label>
      //     <input name="newPassword" type="password" required></input>
      //     <input type="submit" value="Submit"></input>
      // </form>

      // <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
      //     <script>
      //       console.log('hello');

      //         function reset(event){
      //           event.preventDefault();
      //             console.log("hehehehe");
      //         }
      //     </script>
      //                               </html>`);
      //   }

      res.status(200).send(`<html>  
  <form action="/password/updatePassword/${id}" method="get">
  <label for="newPassword">Enter New password</label>
  <input name="newPassword" type="password" required></input>
  <button>reset password</button>
</form>

                            </html>`);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { newPassword } = req.query;
    const FpId = req.params.FpId;

    const FpRecord = await Forgotpassword.findOne({
      where: { id: FpId },
    });
    console.log(1);
    if (FpRecord.used) {
      return res
        .status(500)
        .json({ err: "this link cant be used, It was used already" });
    }

    await FpRecord.update({ used: true });
    console.log(2);
    const user = await User.findOne({ where: { id: FpRecord.userId } });
    // console.log('userDetails', user)
    console.log(3);
    if (user) {
      //encrypt the password
      console.log(user);
      const hash = await bcrypt.hash(newPassword, 10);
      console.log("3.5");
      user.update({ password: hash });
      console.log(4);
      return res
        .status(201)
        .json({ message: "Successfuly update the new password" });
    } else {
      return res.status(404).json({ error: "No user Exists", success: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: error.message, success: false });
  }
};
