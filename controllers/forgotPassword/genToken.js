const moment = require('moment');
const mail = require('../../utils/mailer');
const comFun = require('../../commonFunctions')
const db = require('../../config/database');

module.exports.genToken = (req,res,next)=> {
    if (!comFun.strVal(req.body.email)) {
        res.json({success: 0, message: "Email address not found"});
        return next();
    } else {
        let email = req.body.email.toLowerCase();
        let findQuery = `SELECT *
                         FROM users
                         where email = '${email}'
                           AND isverified = TRUE`;
        db.query(findQuery, function (err, result) {
            if (err) {
                console.log(err);
                res.json({success: 0, message: "Sorry there is some error"})
                return next();
            }
            if (result.rowCount === 0) {
                res.json({success: 0, message: "User not found"})
                return next();
            } else {
                let emailAddress = req.body.email.toLowerCase();
                let otp = Math.floor(100000 + Math.random() * 900000)
                let userId = result.rows[0].user_id;
                let expiry = moment(comFun.getCurrTime()).add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss.SSS');
                let content = `<!DOCTYPE html>
                          <html lang="en">
                          <body class="fr-no-selection">
                              <b>Your OTP for login is:${otp}</b>
                          </body>
                          </html>`
                let insQuery = `INSERT INTO forgot_pass(email, otp, user_id, expiry)
                                VALUES ('${email}', ${otp}, ${userId}, '${expiry}') ON CONFLICT
                                ON CONSTRAINT unique_email
                                    DO
                UPDATE SET otp=${otp},expiry='${expiry}'`;
                console.log(insQuery)
                db.query(insQuery, function (err) {
                    if (err) {
                        console.log(err)
                        res.json({success: 0, message: "Sorry there is some error"})
                        return next();
                    } else {

                        mail(emailAddress, 'Password Reset', content)
                            .on('error', function (s) {
                                console.log(s);
                                res.json({success: 0, message: "Mail not sent"})
                                return next();
                            })
                            .on('done', function () {
                                res.json({success: 1, message: "Password Reset Mail Sent Successfully"});
                                return next()
                            });
                    }
                })
            }
        });
    }
}
