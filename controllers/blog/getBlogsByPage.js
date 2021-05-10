const comFun = require('../../commonFunctions');
const  db = require('../../config/database');

module.exports.getBlog = (req,res,next)=> {
    if (!comFun.numVal(req.body.page)) {
        res.json({success: 0, message: "Error"})
        return next();
    } else {
        let page = req.body.page;
        let limit =10;
        let skip = page * limit;
        let query = `SELECT b.blog_id,b.title,b.thumbnail,b.image,b.content,b.user_id,b.liked,b.dislike,b.timeat,
                            u.firstname,u.lastname
                     FROM blogs b join users u on b.user_id=u.user_id
                     WHERE status=1
                     ORDER BY timeat DESC
                         LIMIT ${limit}
                     OFFSET ${skip};`
        db.query(query,function (err,result){
            if(err){
                res.json({success:0,message:"ERROR"});
                return next();
            }else {
                if(result.rowCount!==0){
                    res.json({success:1,message:"Success",blogs:result.rows});
                }else {
                    res.json({success:-1,message:"No blogs Found"});
                }
            }
        })
    }
}