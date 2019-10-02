module.exports = function(db,app){
    app.post('/api/add',function(req,res){

        if (!req.body) {
            return res.sendStatue(400)
        }
        user = req.body;
        const collection = db.collection('users');

        collection.find({'username':user.username}).count((err,count)=>{
            if (count==0){
                collection.insertOne(user,(err,dbres)=>{
                    if (err) throw err;
                    let num = dbres.insertedCount;
                    res.send({'num':num,err:null});
                    return;
                })
            } else {
                res.send({num:0,err:"duplicate item"});
            }
        });
    });
}