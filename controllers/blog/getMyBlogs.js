const comFun = require('../../commonFunctions');
const db = require('../../config/database');

module.exports.getMyBlog = (req,res,next)=> {
    if (!comFun.numVal(req.body.page)) {
        res.json({success: 0, message: "Error"})
        return next();
    } else {
        let page = req.body.page;
        let userId = res.locals.userId;
        let skip = page * 10;
        let query=`SELECT b.blog_id,b.title,b.thumbnail,b.image,b.content,b.user_id,b.liked,b.dislike,b.timeat,
                          u.firstname,u.lastname
                   FROM blogs b join users u on b.user_id=u.user_id
                   WHERE status<>0 AND b.user_id=${userId}
                   ORDER BY timeat DESC
                       LIMIT 10
                   OFFSET 0;`;
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