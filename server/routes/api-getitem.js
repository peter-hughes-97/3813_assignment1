module.exports = function(db,app,ObjectID){
    //Route to get a single item
    
    app.post('/api/getitem',function(req,res){
      
      
        if (!req.body) {
         return res.sendStatus(400)
        }
        
        user = req.body.userid;
        const collection = db.collection('users');
        collection.find({'username':user}).limit(1).toArray((err,docs)=>{
            //send to client and array of items limited to 1.
            console.log(docs);
              res.send(docs);
            })
         
        })
    
    }