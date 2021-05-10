const jwt = require('jsonwebtoken');
const db = require('../../config/database');

module.exports.verifyMailToken = function (req, res, next) {
    let secret = process.env.verify_mail_secret;
    let token = req.params.token;
    let payload = jwt.verify(token, secret);
    if (payload.endDate < Date.now()) {
        res.json({success: 0, message: 'Link Expired'});
        return next();
    } else {
        let updQuery = `UPDATE users
                        SET isVerified= TRUE
                        WHERE user_id = ${payload.id}`
        db.query(updQuery, function (err, result) {
            if (err) {
                console.log(err);
                res.json({success: 0, message: 'Sorry there is some error'});
                return next();
            } else {
                res.json({success: 1, message: 'Email verified'});
                return next();
            }
        })
    }
}