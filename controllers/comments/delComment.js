const comFun = require('../../commonFunctions')
const db = require('../../config/database');
module.exports.delComments = (req,res,next)=>{
    if (!comFun.strVal(req.body.id)) {
        console.log("Error in  fields");
        res.json({success: 0, message: "Error"})
        return next();
    } else {
        const id = req.body.id;
        const userId = res.locals.userId;
        let query = `DELETE FROM comments WHERE comment_id=${id} AND user_id=${userId}`;
        db.query(query,function (err){
            if(err){
                res.json({success:0,message:"Error"})
                return next();
            }else {
                res.json({success:1,message:"Updated"});
                return next();
            }
        })
    }
}