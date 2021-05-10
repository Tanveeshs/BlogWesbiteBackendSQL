
const comFun = require('../../commonFunctions');
const db = require('../../config/database');

module.exports.getBlog = (req,res,next) => {
    if(!comFun.strVal(req.body.blog)){
        console.log("Error in  fields");
        res.json({success: 0, message: "Error"})
        return next();
    } else {
        let blogId = req.body.blog;
        let query=`SELECT b.blog_id,b.title,b.thumbnail,b.image,b.content,b.user_id,b.liked,b.dislike,b.timeat,
                          u.firstname,u.lastname
                   FROM blogs b join users u on b.user_id=u.user_id
                   WHERE blog_id=${blogId} AND status=1;
                    SELECT c.comment,c.timeat,u.firstname,u.lastname FROM comments c JOIN users u on c.user_id=u.user_id
                    WHERE blog_id=${blogId};`
        db.query(query,function (err,result){
            if(err){
                res.json({success:0,message:"Error"});
                return next();
            }else {
                let blogData = result[0].rows[0];
                let commentData = result[1].rows;
                blogData.comments = commentData;
                res.json({success:1,message:"Success",data:blogData});
                return next();
            }
        })

    }
}