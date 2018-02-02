require("dotenv").config();
const express = require("express");
const jwt = require("jwt-simple");
const router = express.Router();
const User = require("../models/user");
const config = require("../config");
const nodemailer = require("nodemailer");
const moment = require("moment");

router.post("/signup", (req, res, next) => {
  // extract the info we need from the body
  // of the request

  const { username, email, password, lang } = req.body;

  // create the new user
  // notice how we don't pass the password because
  // we're letting User.register add the hashed version
  // for us
  const user = new User({
    username,
    email,
    lang
  });

  User.register(user, password, err => {
    if (err) {
      return next(err);
    }

    // Send an email to the new users

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: process.env.MAIL_ADDR,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      });
      var mailOptions = {};
      // setup email data with unicode symbols
      if (lang === "EN") {
        mailOptions = {
          from: '"Insiders" <contact@insiders.finance>', // sender address
          to: email, // list of receivers
          subject: "Welcome to insiders' community! 🚀🚀🚀", // Subject line
          // text: "text ici"// plain text body
          html:
            "<p>Hello  " +
            username +
            ", </p>" +
            "<p>We noticed you've signed up to Insiders. We just want to say thanks and to let you know we're here to answer any questions.</p>" +
            "<p>Hopefully you've already have a chance to get an idea on how Insiders works. If not please feel free to send us direct email <a href='mailto:fred@insiders.finance,nicolas@insiders.finance?Subject=Hello%20again' target='_top'>fred@insiders.finance</a> or <a href='mailto:nicolas@insiders.finance,fred@insiders.finance?Subject=Hello%20again' target='_top'>nicolas@insiders.finance</a>.</p>" +
            "<p>We genuinely value user feedback. So please don't hesitate to get in contact with us, even if it's just to say Hi!</p>" +
            "<p>The community is waiting for your insights! Publish some Babbles to share your info and... take position on your prefered stocks with our friends Bull and Bear. </p>" +
            "<br><p>- Nico and Fred</p>" +
            "<br><a href='https://www.insiders.finance'>www.insiders.finance</a>"
        };
      } else {
        mailOptions = {
          from: '"Insiders" <contact@insiders.finance>', // sender address
          to: email, // list of receivers
          subject: "Bienvenue dans la communauté Insiders ! 🚀🚀🚀", // Subject line
          // text: "text ici"// plain text body
          html:
            "<p>Bonjour  " +
            username +
            ", </p>" +
            "<p>Nous avons remarqué que vous vous êtes inscrit sur notre site insiders.finance. Nous tenions simplement à vous remercier et à vous informer que nous sommes ici pour répondre à vos questions.</p>" +
            "<p>J'espère que vous avez déjà eu l'occasion de vous faire une idée du fonctionnement d'insiders. Si ce n'est pas le cas, n'hésitez pas à nous envoyer un email directement à <a href='mailto:fred@insiders.finance,nicolas@insiders.finance?Subject=Hello%20again' target='_top'>fred@insiders.finance</a> ou <a href='mailto:nicolas@insiders.finance,fred@insiders.finance?Subject=Hello%20again' target='_top'>nicolas@insiders.finance</a>.</p>" +
            "<p>Nous apprécions vraiment les commentaires des utilisateurs. N'hésitez donc pas à nous contacter, même si c'est juste pour dire bonjour !</p>" +
            "<p>La communauté attend vos sentiments de marché! Publiez quelques Babbles pour partager vos infos et ... prenez position sur vos actions préférées avec nos amis Bull et Bear.</p>" +
            "<br><p>- Nico et Fred</p>" +
            "<br><a href='https://www.insiders.finance'>www.insiders.finance</a>"
        };
      }

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });

      res.json({ success: true });
    });
  });
});

// User.authenticate() returns a function
const authenticate = User.authenticate();
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  // check if we have a username and password
  if (email && password) {
    // test if the credentials are valid
    authenticate(email, password, (err, user, failed) => {
      if (err) {
        // an unexpected error from the database
        return next(err);
      }
      if (failed) {
        // failed logging (bad password, too many attempts, etc)
        return res.status(401).json({
          error: failed.message
        });
      }
      if (user) {
        // success!! Save the user id
        // NEVER save the password here
        // the id is usually enough because we can get back
        // the actual user by fetching the database later
        const payload = {
          id: user.id
        };
        // generate a token and send it
        // this token will contain the user.id encrypted
        // only the server is able to decrypt it
        // for the client, this is just a token, he knows that
        // he has to send it
        const token = jwt.encode(payload, config.jwtSecret);
        res.json({
          user: {
            username: user.username,
            email: user.email,
            _id: user._id
          },
          token
        });
      }
    });
  } else {
    // unauthorized error
    res.sendStatus(401);
  }
});

router.post("/forgot_password", function(req, res, next) {
  const email = req.body.email;
  console.log("email", email);

  User.findOne({ email: email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.json("no user");
    } else {
      nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: process.env.MAIL_ADDR,
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
          }
        });
        var mailOptions = {};
        // setup email data with unicode symbols
        if (user.lang === "EN") {
          mailOptions = {
            from: '"Insiders" <contact@insiders.finance>', // sender address
            to: email, // list of receivers
            subject: "Reset your password", // Subject line
            // text: "text ici"// plain text body
            html:
              "<p>Hello  " +
              user.username +
              "," +
              `<br><br>To change your password, please <a href="https://www.insiders.finance/resetpassword/${user._id}?${new Date()}">click here</a>` +
              "<br><p>- Nico & Fred</p>" +
              "<br><a href='https://www.insiders.finance'>www.insiders.finance</a>"
          };
        } else {
          mailOptions = {
            from: '"Insiders" <contact@insiders.finance>', // sender address
            to: email, // list of receivers
            subject: "Réinitialiser votre mot de passe", // Subject line
            // text: "text ici"// plain text body
            html:
              "<p>Bonjour  " +
              user.username +
              "," +
              `<br><br>Pour changer votre mot de passe, veuillez <a href="https://www.insiders.finance/resetpassword/${user._id}?${new Date()}">cliquez-ici</a>` +
              "<br><p>- Nico & Fred</p>" +
              "<br><a href='https://www.insiders.finance'>www.insiders.finance</a>"
          };
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
      });
      res.json(user.username);
    }
  });
});

router.get("/new_password", function(req, res, next) {
  const userId = req.body.userId;

  User.findByIdAndUpdate(userId, (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.json("no user");
    } else {
      res.json(user._id);
    }
  });
});

router.post("/new_password/:id", function(req, res, next) {
  const userId = req.params.id;
  const password = req.body.password;

  User.findById(userId, function(err, user) {
    user.setPassword(password, function(err) {
      if (err) {
        return next(err);
      }
      user.save(function(err) {
        if (err) {
          return next(err);
        } else {
          nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              host: process.env.MAIL_ADDR,
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
              }
            });
            var mailOptions = {};
            // setup email data with unicode symbols
            if (user.lang === "EN") {
              mailOptions = {
                from: '"Insiders" <contact@insiders.finance>', // sender address
                to: user.email, // list of receivers
                subject: "Your password have been successfully reset", // Subject line
                // text: "text ici"// plain text body
                html:
                  "<p>Hello  " +
                  user.username +
                  "," +
                  `<br><br><p>Your password have been successfully reset.</p>` +
                  "<br><p>- Nico & Fred</p>" +
                  "<br><a href='https://www.insiders.finance'>www.insiders.finance</a>"
              };
            } else {
              mailOptions = {
                from: '"Insiders" <contact@insiders.finance>', // sender address
                to: user.email, // list of receivers
                subject: "Mise à jour de votre mot de passe.", // Subject line
                // text: "text ici"// plain text body
                html:
                  "<p>Bonjour  " +
                  user.username +
                  "," +
                  `<br><br><p>Votre mot de passe a été mis à jour avec succès.</p>` +
                  "<br><p>- Nico & Fred</p>" +
                  "<br><a href='https://www.insiders.finance'>www.insiders.finance</a>"
              };
            }

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log("Message sent: %s", info.messageId);
              // Preview only available when sending through an Ethereal account
              console.log(
                "Preview URL: %s",
                nodemailer.getTestMessageUrl(info)
              );
              res.json({ success: true });

              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
          });
        }
      });
    });
  });
});

module.exports = router;
